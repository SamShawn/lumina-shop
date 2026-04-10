import type { Metadata } from 'next';

// In production, this would fetch from the database
// For now, using mock product data
const MOCK_PRODUCTS: Record<string, { name: string; description: string; price: number; image: string }> = {
  'minimal-desk-lamp': {
    name: 'Minimal Desk Lamp',
    description: 'A precision-crafted desk lamp that combines form and function in perfect balance. The minimalist silhouette houses advanced LED technology with adjustable color temperature.',
    price: 28900,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80',
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS[slug];

  if (!product) {
    return {
      title: 'Product Not Found | Lumina',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lumina.shop';

  return {
    title: `${product.name} | Lumina`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Lumina`,
      description: product.description,
      url: `${baseUrl}/products/${slug}`,
      siteName: 'Lumina',
      type: 'website',
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Lumina`,
      description: product.description,
      images: [product.image],
    },
  };
}
