import styles from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={`${styles.skeleton} ${className || ''}`} style={style} />;
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={styles.textSkeleton}
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <div className={styles.cardImageSkeleton} />
      <div className={styles.cardContentSkeleton}>
        <Skeleton className={styles.textSkeleton} style={{ width: '40%', height: 12 }} />
        <Skeleton className={styles.textSkeletonLg} />
        <Skeleton className={styles.textSkeleton} style={{ width: '30%', height: 14 }} />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ aspectRatio: '1', borderRadius: 'var(--radius-xl)', background: 'var(--color-secondary)' }} />
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', background: 'var(--color-secondary)' }} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Skeleton style={{ width: '30%', height: 24 }} />
        <Skeleton style={{ width: '60%', height: 32 }} />
        <Skeleton style={{ width: '40%', height: 20 }} />
        <Skeleton style={{ width: '100%', height: 60 }} />
        <Skeleton style={{ width: '80%', height: 16 }} />
        <Skeleton style={{ width: '70%', height: 16 }} />
        <div style={{ height: 48 }} />
        <Skeleton style={{ width: '100%', height: 48 }} />
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 100px 40px', gap: 'var(--space-4)', padding: 'var(--space-6) 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
        <Skeleton style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingTop: 'var(--space-2)' }}>
          <Skeleton style={{ width: '70%', height: 16 }} />
          <Skeleton style={{ width: '40%', height: 14 }} />
        </div>
      </div>
      <Skeleton style={{ width: 100, height: 32, alignSelf: 'center' }} />
      <Skeleton style={{ width: 60, height: 16, alignSelf: 'center' }} />
      <Skeleton style={{ width: 32, height: 32, alignSelf: 'center' }} />
    </div>
  );
}
