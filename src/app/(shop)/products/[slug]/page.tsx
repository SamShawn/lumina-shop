import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import styles from './page.module.css';

const PRODUCT = {
  id: '1',
  name: 'Minimal Desk Lamp',
  slug: 'minimal-desk-lamp',
  price: '$289',
  comparePrice: undefined,
  description: 'A precision-crafted desk lamp that combines form and function in perfect balance. The minimalist silhouette houses advanced LED technology with adjustable color temperature, providing ideal illumination for any task. Constructed from aerospace-grade aluminum with a weighted base for stability.',
  features: [
    'Adjustable color temperature (2700K-6500K)',
    'Touch-sensitive dimming control',
    'USB-C fast charging port',
    '40,000 hour LED lifespan',
    'Weighted aluminum base',
  ],
  specifications: {
    'Material': 'Aluminum, Steel',
    'Dimensions': '18" H x 5" W x 5" D',
    'Weight': '2.5 lbs',
    'Power': '12W LED',
    'Lumens': '800',
  },
  images: [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
    'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80',
  ],
  reviews: 47,
  rating: 4.8,
};

export default function ProductDetailPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products">Products</a>
          <span>/</span>
          <span>{PRODUCT.name}</span>
        </nav>

        <div className={styles.layout}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={PRODUCT.images[0]} alt={PRODUCT.name} />
            </div>
            <div className={styles.thumbnails}>
              {PRODUCT.images.map((image, index) => (
                <button key={index} className={`${styles.thumbnail} ${index === 0 ? styles.active : ''}`}>
                  <img src={image} alt={`${PRODUCT.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className={styles.info}>
            <Badge variant="accent">New Arrival</Badge>
            <h1 className={styles.title}>{PRODUCT.name}</h1>

            <div className={styles.rating}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= Math.floor(PRODUCT.rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span className={styles.ratingText}>{PRODUCT.rating} ({PRODUCT.reviews} reviews)</span>
            </div>

            <div className={styles.price}>
              <span className={styles.currentPrice}>{PRODUCT.price}</span>
              {PRODUCT.comparePrice && (
                <span className={styles.comparePrice}>{PRODUCT.comparePrice}</span>
              )}
            </div>

            <p className={styles.description}>{PRODUCT.description}</p>

            {/* Features */}
            <div className={styles.features}>
              <h3 className={styles.sectionTitle}>Features</h3>
              <ul className={styles.featureList}>
                {PRODUCT.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity */}
            <div className={styles.quantity}>
              <span className={styles.quantityLabel}>Quantity</span>
              <div className={styles.quantityControl}>
                <button className={styles.quantityBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"/>
                  </svg>
                </button>
                <span className={styles.quantityValue}>1</span>
                <button className={styles.quantityBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <Button size="lg" className={styles.addToCart}>Add to Cart</Button>
              <Button variant="outline" size="lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </Button>
            </div>

            {/* Specifications */}
            <div className={styles.specifications}>
              <h3 className={styles.sectionTitle}>Specifications</h3>
              <dl className={styles.specList}>
                {Object.entries(PRODUCT.specifications).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
