import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { json, error, notFound, unauthorized } from '@/lib/api-utils';
import { getAuthSession } from '@/lib/get-auth';

// POST /api/orders — create order from cart
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return unauthorized('Authentication required');
    }

    const {
      shippingAddressId,
      billingAddressId,
      paymentMethod = 'card',
      notes,
      couponCode,
    } = await request.json();

    // Fetch user's cart with items
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return error('Cart is empty', 400);
    }

    // Calculate totals
    const subtotal = cart.items.reduce(
      (sum: number, item: Record<string, unknown>) =>
        sum + Number((item.product as Record<string, unknown>).price) * (item.quantity as number),
      0
    );

    // Shipping cost (simplified — free over $100)
    const shippingCost = subtotal >= 10000 ? 0 : 995;

    // Tax (simplified — 8%)
    const tax = Math.round(subtotal * 0.08);

    // Discount
    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode, isActive: true },
      });

      if (
        coupon &&
        coupon.usedCount < (coupon.maxUses ?? Infinity) &&
        new Date() >= coupon.validFrom &&
        new Date() <= coupon.validUntil &&
        (!coupon.minAmount || subtotal >= Number(coupon.minAmount))
      ) {
        discount =
          coupon.type === 'PERCENTAGE'
            ? Math.round((subtotal * Number(coupon.value)) / 100)
            : Number(coupon.value) * 100;
      }
    }

    const total = subtotal + shippingCost + tax - discount;

    // Generate order number
    const orderCount = await prisma.order.count();
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(orderCount + 1).padStart(4, '0')}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        shippingAddressId,
        billingAddressId,
        subtotal: subtotal * 100, // store in cents
        shippingCost: shippingCost * 100,
        tax: tax * 100,
        discount: discount * 100,
        total: total * 100,
        paymentMethod,
        paymentStatus: 'PENDING',
        notes,
        items: {
          create: cart.items.map((item: Record<string, unknown>) => ({
            productId: item.productId as string,
            quantity: item.quantity as number,
            price: Number((item.product as Record<string, unknown>).price) * 100,
            total: Number((item.product as Record<string, unknown>).price) * (item.quantity as number) * 100,
          })),
        },
      },
      include: {
        items: {
          include: { product: { select: { id: true, name: true, slug: true, images: true, sku: true } } },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    // Increment coupon usage
    if (couponCode) {
      await prisma.coupon.update({
        where: { code: couponCode },
        data: { usedCount: { increment: 1 } },
      });
    }

    return json(
      {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
      },
      201
    );
  } catch (err) {
    console.error('POST /api/orders error:', err);
    return error('Failed to create order', 500);
  }
}

// GET /api/orders — list user's orders
export async function GET(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return unauthorized('Authentication required');
    }

    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const pageSize = 10;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          items: {
            include: {
              product: {
                select: { id: true, name: true, slug: true, images: true },
              },
            },
          },
        },
      }),
      prisma.order.count({ where: { userId: session.user.id } }),
    ]);

    const ordersList = orders.map((o: Record<string, unknown>) => ({
      id: o.id as string,
      orderNumber: o.orderNumber as string,
      status: o.status as string,
      total: o.total as number,
      itemCount: (o.items as { quantity: number }[]).reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0),
      createdAt: o.createdAt as Date,
    }));

    return json({
      orders: ordersList,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error('GET /api/orders error:', err);
    return error('Failed to fetch orders', 500);
  }
}
