import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link href="/">
            <Button size="lg">Go Home</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
