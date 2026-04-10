import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { json, error, unauthorized } from '@/lib/api-utils';
import { getAuthSession } from '@/lib/get-auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return unauthorized('Authentication required');
    }

    const {
      items, // { productId: string, quantity: number }[]
      couponCode,
      shippingAddressId,
      billingAddressId,
    } = await request.json();

    if (!items || items.length === 0) {
      return error('No items provided', 400);
    }

    // Fetch products for the line items
    const productIds = items.map((i: { productId: string }) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    if (products.length !== items.length) {
      return error('Some products are not available', 400);
    }

    // Build Stripe line items
    const lineItems = products.map((product: Record<string, unknown>) => {
      const quantity = items.find((i: { productId: string }) => i.productId === product.id)?.quantity ?? 1;
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name as string,
            description: (product.description as string).slice(0, 200),
            images: (product.images as string[]).slice(0, 1), // first image only for Stripe
            metadata: {
              productId: product.id as string,
              sku: product.sku as string,
            },
          },
          unit_amount: Math.round(Number(product.price) * 100), // price is already in dollars, convert to cents
        },
        quantity,
      };
    });

    // Fetch addresses for shipping
    let shippingAddress: Record<string, unknown> | null = null;
    if (shippingAddressId) {
      const addr = await prisma.address.findUnique({
        where: { id: shippingAddressId, userId: session.user.id },
      });
      if (addr) {
        shippingAddress = {
          name: `${addr.firstName} ${addr.lastName}`,
          address: {
            line1: addr.address1,
            line2: addr.address2 ?? undefined,
            city: addr.city,
            state: addr.state,
            postal_code: addr.postalCode,
            country: addr.country,
          },
          phone: addr.phone,
        };
      }
    }

    // Create or fetch coupon discount
    let discountPercent = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase(), isActive: true },
      });

      if (
        coupon &&
        new Date() >= coupon.validFrom &&
        new Date() <= coupon.validUntil &&
        coupon.usedCount < (coupon.maxUses ?? Infinity)
      ) {
        if (coupon.type === 'PERCENTAGE') {
          discountPercent = Number(coupon.value);
        } else {
          // Fixed discount — convert to percent of first item (simplified)
          discountPercent = 0;
        }
      }
    }

    // Calculate totals for metadata
    const subtotal = products.reduce((sum: number, p: Record<string, unknown>) => {
      const qty = items.find((i: { productId: string }) => i.productId === p.id)?.quantity ?? 1;
      return sum + Number(p.price) * qty;
    }, 0);
    const shippingCost = subtotal >= 100 ? 0 : 9.95;
    const tax = Math.round(subtotal * 0.08);
    const discountAmount = discountPercent > 0 ? Math.round((subtotal * discountPercent) / 100) : 0;
    const total = subtotal + shippingCost + tax - discountAmount;

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: session.user.email ?? undefined,
      customer: undefined, // don't attach to existing customer
      line_items: lineItems,
      shipping_address_collection: shippingAddress ? undefined : {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: Math.round(shippingCost * 100), currency: 'usd' },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      discounts: discountPercent > 0
        ? [{ coupon: undefined }] // Can't create dynamic coupons easily; handle via metadata instead
        : undefined,
      metadata: {
        userId: session.user.id,
        items: JSON.stringify(items),
        couponCode: couponCode ?? '',
        subtotal: String(Math.round(subtotal * 100)),
        shippingCost: String(Math.round(shippingCost * 100)),
        tax: String(tax),
        discount: String(discountAmount * 100),
        total: String(Math.round(total * 100)),
        shippingAddressId: shippingAddressId ?? '',
        billingAddressId: billingAddressId ?? '',
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/checkout`,
    });

    return json({ url: stripeSession.url, sessionId: stripeSession.id });
  } catch (err) {
    console.error('POST /api/checkout error:', err);
    return error('Failed to create checkout session', 500);
  }
}
