import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { json, error, notFound, unauthorized } from '@/lib/api-utils';
import { getAuthSession } from '@/lib/get-auth';
import type { Cart } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const session = await getAuthSession();
    const cartId = request.headers.get('x-cart-id');

    let cart;

    if (session?.user?.id) {
      cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
        include: {
          items: {
            include: {
              product: {
                include: { category: true },
              },
            },
          },
        },
      });
    } else if (cartId) {
      cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
          items: {
            include: {
              product: {
                include: { category: true },
              },
            },
          },
        },
      });
    }

    if (!cart) {
      // Return empty cart
      return json({
        id: null,
        items: [],
        subtotal: 0,
        itemCount: 0,
      } as unknown as Cart);
    }

    const items = cart.items.map((item: Record<string, unknown>) => ({
      id: item.id as string,
      quantity: item.quantity as number,
      product: {
        id: (item.product as Record<string, unknown>).id as string,
        name: (item.product as Record<string, unknown>).name as string,
        slug: (item.product as Record<string, unknown>).slug as string,
        price: Math.round(Number((item.product as Record<string, unknown>).price) * 100),
        images: ((item.product as Record<string, unknown>).images as string[]).map((url: string) => ({ url })),
        category: (item.product as Record<string, unknown>).category as Cart['items'][0]['product']['category'],
        isFeatured: (item.product as Record<string, unknown>).isFeatured as boolean,
        stock: (item.product as Record<string, unknown>).stock as number,
      },
      addedAt: item.createdAt as Date,
    }));

    const subtotal = items.reduce((sum: number, item: typeof items[0]) => sum + item.product.price * item.quantity, 0);

    return json({
      id: cart.id,
      userId: cart.userId,
      sessionId: cart.sessionId,
      items,
      subtotal,
      itemCount: items.reduce((sum: number, item: typeof items[0]) => sum + item.quantity, 0),
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    } as unknown as Cart);
  } catch (err) {
    console.error('GET /api/cart error:', err);
    return error('Failed to fetch cart', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();
    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return error('productId is required');
    }

    const product = await prisma.product.findUnique({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      return notFound('Product not found');
    }

    let cart;

    if (session?.user?.id) {
      // Authenticated user — find or create cart
      cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId: session.user.id },
        });
      }

      // Add or update item
      const existing = await prisma.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId } },
      });

      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: { cartId: cart.id, productId, quantity },
        });
      }
    } else {
      return unauthorized('Authentication required');
    }

    return json({ cartId: cart.id }, 201);
  } catch (err) {
    console.error('POST /api/cart error:', err);
    return error('Failed to add item to cart', 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return unauthorized('Authentication required');
    }

    const { itemId, quantity } = await request.json();

    if (!itemId || quantity === undefined) {
      return error('itemId and quantity are required');
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      return notFound('Cart not found');
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: itemId, cartId: cart.id },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: itemId, cartId: cart.id },
        data: { quantity },
      });
    }

    return json({ success: true });
  } catch (err) {
    console.error('PATCH /api/cart error:', err);
    return error('Failed to update cart item', 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return unauthorized('Authentication required');
    }

    const { searchParams } = request.nextUrl;
    const itemId = searchParams.get('itemId');

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      return notFound('Cart not found');
    }

    if (itemId) {
      await prisma.cartItem.delete({
        where: { id: itemId, cartId: cart.id },
      });
    } else {
      // Clear entire cart
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return json({ success: true });
  } catch (err) {
    console.error('DELETE /api/cart error:', err);
    return error('Failed to delete cart item', 500);
  }
}
