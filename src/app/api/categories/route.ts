import { prisma } from '@/lib/prisma';
import { json, error } from '@/lib/api-utils';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null }, // top-level only
      include: {
        _count: { select: { products: { where: { isActive: true } } } },
        children: {
          include: {
            _count: { select: { products: { where: { isActive: true } } } },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    const result = categories.map((cat: Record<string, unknown>) => ({
      id: cat.id as string,
      name: cat.name as string,
      slug: cat.slug as string,
      description: cat.description as string | null,
      image: cat.image as string | null,
      productCount: (cat._count as { products: number }).products,
      children: (cat.children as Record<string, unknown>[]).map((child: Record<string, unknown>) => ({
        id: child.id as string,
        name: child.name as string,
        slug: child.slug as string,
        productCount: (child._count as { products: number }).products,
      })),
    }));

    return json(result);
  } catch (err) {
    console.error('GET /api/categories error:', err);
    return error('Failed to fetch categories', 500);
  }
}
