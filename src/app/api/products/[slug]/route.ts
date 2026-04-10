import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { json, error, notFound } from '@/lib/api-utils';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug, isActive: true },
      include: {
        category: true,
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true, image: true } } },
          orderBy: { createdAt: 'desc' },
        },
        specifications: true,
      },
    });

    if (!product) {
      return notFound('Product not found');
    }

    return json({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Math.round(Number(product.price) * 100),
      comparePrice: product.comparePrice
        ? Math.round(Number(product.comparePrice) * 100)
        : undefined,
      sku: product.sku,
      stock: product.stock,
      images: product.images.map((url: string) => ({ url })),
      video: product.video,
      specifications: product.specifications as Record<string, string | number | boolean> | null,
      features: product.features,
      category: product.category,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      reviews: product.reviews.map((r: Record<string, unknown>) => ({
        id: r.id as string,
        userId: r.userId as string,
        user: { name: (r.user as Record<string, unknown>).name as string | null, image: (r.user as Record<string, unknown>).image as string | null },
        productId: r.productId as string,
        rating: r.rating as number,
        title: r.title as string | null,
        content: r.content as string | null,
        images: r.images as string[],
        isApproved: r.isApproved as boolean,
        createdAt: r.createdAt as Date,
      })),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (err) {
    console.error('GET /api/products/[slug] error:', err);
    return error('Failed to fetch product', 500);
  }
}
