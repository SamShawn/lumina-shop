import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { json, error, notFound } from '@/lib/api-utils';
import type { ProductListItem, SortOption } from '@/types';

const DEFAULT_PAGE_SIZE = 12;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const pageSize = Math.min(
      DEFAULT_PAGE_SIZE,
      Math.max(1, parseInt(searchParams.get('pageSize') ?? String(DEFAULT_PAGE_SIZE), 10))
    );
    const category = searchParams.get('category') ?? undefined;
    const sort = (searchParams.get('sort') ?? 'newest') as SortOption;
    const search = searchParams.get('search') ?? undefined;
    const featured = searchParams.get('featured') === 'true';
    const minPrice = searchParams.get('minPrice')
      ? parseInt(searchParams.get('minPrice')!, 10)
      : undefined;
    const maxPrice = searchParams.get('maxPrice')
      ? parseInt(searchParams.get('maxPrice')!, 10)
      : undefined;

    // Build where clause
    const where: Record<string, unknown> = { isActive: true };

    if (category) {
      where.category = { slug: category };
    }

    if (featured) {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        (where.price as Record<string, number>).gte = minPrice;
      }
      if (maxPrice !== undefined) {
        (where.price as Record<string, number>).lte = maxPrice;
      }
    }

    // Build orderBy
    type OrderBy = Record<string, unknown>;
    let orderBy: OrderBy = { createdAt: 'desc' };
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' };
        break;
      case 'price-desc':
        orderBy = { price: 'desc' };
        break;
      case 'rating':
        orderBy = { reviews: { _count: 'desc' } };
        break;
      case 'popular':
        orderBy = { orderItems: { _count: 'desc' } };
        break;
      default: // newest
        orderBy = { createdAt: 'desc' };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          category: true,
          reviews: { where: { isApproved: true }, select: { rating: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    const productsList: ProductListItem[] = products.map((p: Record<string, unknown>) => ({
      id: p.id as string,
      name: p.name as string,
      slug: p.slug as string,
      price: Math.round(Number(p.price) * 100),
      comparePrice: p.comparePrice ? Math.round(Number(p.comparePrice) * 100) : undefined,
      images: (p.images as string[]).map((url: string) => ({ url })),
      category: p.category as ProductListItem['category'],
      isFeatured: p.isFeatured as boolean,
      stock: p.stock as number,
      rating:
        (p.reviews as { rating: number }[]).length > 0
          ? (p.reviews as { rating: number }[]).reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
            (p.reviews as { rating: number }[]).length
          : undefined,
      reviewCount: (p.reviews as unknown[]).length,
    }));

    return json({
      products: productsList,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error('GET /api/products error:', err);
    return error('Failed to fetch products', 500);
  }
}
