'use client';

import { HeroSection } from '@/components/homepage/HeroSection';
import { ProductStrip } from '@/components/homepage/ProductStrip';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Minimal Desk Lamp',
    slug: 'minimal-desk-lamp',
    price: 28900,
    images: [{ url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' }],
    category: { name: 'Lighting' },
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Ceramic Pour-Over Set',
    slug: 'ceramic-pour-over-set',
    price: 15600,
    images: [{ url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80' }],
    category: { name: 'Tableware' },
  },
  {
    id: '3',
    name: 'Leather Notebook',
    slug: 'leather-notebook',
    price: 8900,
    images: [{ url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80' }],
    category: { name: 'Stationery' },
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductStrip products={FEATURED_PRODUCTS} title="New Arrivals" />
    </>
  );
}
