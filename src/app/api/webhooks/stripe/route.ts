import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

// Disable body parsing for webhook — Next.js handles it differently
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: NextRequest): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = req.body?.getReader();
  if (!reader) throw new Error('No body');
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function POST(request: NextRequest) {
  const body = await getRawBody(request);
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return new Response('No signature', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const items = session.metadata?.items
          ? JSON.parse(session.metadata.items)
          : [];
        const subtotal = parseInt(session.metadata?.subtotal ?? '0', 10);
        const shippingCost = parseInt(session.metadata?.shippingCost ?? '0', 10);
        const tax = parseInt(session.metadata?.tax ?? '0', 10);
        const discount = parseInt(session.metadata?.discount ?? '0', 10);
        const total = parseInt(session.metadata?.total ?? '0', 10);
        const couponCode = session.metadata?.couponCode || undefined;
        const shippingAddressId = session.metadata?.shippingAddressId || undefined;
        const billingAddressId = session.metadata?.billingAddressId || undefined;

        if (!userId) {
          console.error('No userId in checkout session metadata');
          break;
        }

        // Generate order number
        const orderCount = await prisma.order.count();
        const orderNumber = `ORD-${new Date().getFullYear()}-${String(orderCount + 1).padStart(4, '0')}`;

        // Create order
        const order = await prisma.order.create({
          data: {
            orderNumber,
            userId,
            status: 'CONFIRMED',
            shippingAddressId: shippingAddressId || null,
            billingAddressId: billingAddressId || null,
            subtotal: subtotal,
            shippingCost: shippingCost,
            tax: tax,
            discount: discount,
            total: total,
            paymentMethod: 'card',
            paymentStatus: 'PAID',
            paymentId: session.payment_intent as string,
            items: {
              create: items.map((item: { productId: string; quantity: number }) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: 0, // Will be filled from product
                total: 0,
              })),
            },
          },
        });

        // Update order items with actual prices from products
        for (const item of items) {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
          });
          if (product) {
            await prisma.orderItem.updateMany({
              where: { orderId: order.id, productId: item.productId },
              data: {
                price: Math.round(Number(product.price) * 100),
                total: Math.round(Number(product.price) * 100) * item.quantity,
              },
            });
          }
        }

        // Clear user's cart
        const cart = await prisma.cart.findUnique({ where: { userId } });
        if (cart) {
          await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        }

        // Increment coupon usage
        if (couponCode) {
          await prisma.coupon.update({
            where: { code: couponCode.toUpperCase() },
            data: { usedCount: { increment: 1 } },
          });
        }

        // Create payment record
        await prisma.payment.create({
          data: {
            orderId: order.id,
            amount: total,
            currency: 'usd',
            method: 'card',
            status: 'PAID',
            provider: 'stripe',
            providerId: session.payment_intent as string,
          },
        });

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error(`Error handling webhook event ${event.type}:`, err);
    return new Response('Webhook handler error', { status: 500 });
  }
}
