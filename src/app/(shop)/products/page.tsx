import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardImage, CardContent, CardTitle, CardPrice } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import styles from './page.module.css';

const PRODUCTS = [
  {
    id: '1',
    name: 'Minimal Desk Lamp',
    slug: 'minimal-desk-lamp',
    price: '$289',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    badge: 'New',
    category: 'Lighting',
  },
  {
    id: '2',
    name: 'Ceramic Pour-Over Set',
    slug: 'ceramic-pour-over-set',
    price: '$156',
    comparePrice: '$195',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    badge: '20% Off',
    category: 'Tableware',
  },
  {
    id: '3',
    name: 'Leather Notebook',
    slug: 'leather-notebook',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
    category: 'Stationery',
  },
  {
    id: '4',
    name: 'Artisan Candle',
    slug: 'artisan-candle',
    price: '$68',
    image: 'https://images.unsplash.com/photo-1602607714066-4908c9a0a2b5?w=600&q=80',
    badge: 'Bestseller',
    category: 'Home',
  },
  {
    id: '5',
    name: 'Copper Tumbler Set',
    slug: 'copper-tumbler-set',
    price: '$124',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    category: 'Tableware',
  },
  {
    id: '6',
    name: 'Brass Table Clock',
    slug: 'brass-table-clock',
    price: '$345',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80',
    badge: 'New',
    category: 'Lighting',
  },
  {
    id: '7',
    name: 'Linen Throw Blanket',
    slug: 'linen-throw-blanket',
    price: '$198',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    category: 'Home',
  },
  {
    id: '8',
    name: 'Walnut Phone Stand',
    slug: 'walnut-phone-stand',
    price: '$78',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    category: 'Stationery',
  },
];

const CATEGORIES = ['All', 'Lighting', 'Tableware', 'Stationery', 'Home'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function ProductsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>All Products</h1>
          <p className={styles.subtitle}>Discover our curated collection of exceptional pieces</p>
        </div>

        <div className={styles.layout}>
          {/* Filters Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Categories</h3>
              <div className={styles.filterOptions}>
                {CATEGORIES.map((category) => (
                  <label key={category} className={styles.filterOption}>
                    <input type="radio" name="category" value={category} defaultChecked={category === 'All'} />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Price Range</h3>
              <div className={styles.priceInputs}>
                <input type="number" placeholder="Min" className={styles.priceInput} />
                <span className={styles.priceSeparator}>—</span>
                <input type="number" placeholder="Max" className={styles.priceInput} />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Availability</h3>
              <div className={styles.filterOptions}>
                <label className={styles.filterOption}>
                  <input type="checkbox" />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <Button variant="outline" className={styles.clearBtn}>Clear Filters</Button>
          </aside>

          {/* Products Grid */}
          <div className={styles.main}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <span className={styles.resultCount}>{PRODUCTS.length} Products</span>
              <div className={styles.sortWrapper}>
                <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
                <select id="sort" className={styles.sortSelect}>
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className={styles.grid}>
              {PRODUCTS.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  <Card hover className={styles.productCard}>
                    <CardImage src={product.image} alt={product.name} />
                    <CardContent>
                      {product.badge && (
                        <Badge
                          variant={product.badge === '20% Off' ? 'error' : 'accent'}
                          className={styles.productBadge}
                        >
                          {product.badge}
                        </Badge>
                      )}
                      <span className={styles.productCategory}>{product.category}</span>
                      <CardTitle>{product.name}</CardTitle>
                      <CardPrice amount={product.price} compareAmount={product.comparePrice} />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <Button variant="outline" disabled>Previous</Button>
              <div className={styles.paginationPages}>
                <span className={styles.paginationCurrent}>1</span>
                <span className={styles.paginationSeparator}>/</span>
                <span className={styles.paginationTotal}>3</span>
              </div>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
