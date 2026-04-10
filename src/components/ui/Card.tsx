import { HTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.card} ${styles[variant]} ${hover ? styles.hover : ''} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export function CardImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`${styles.image} ${className || ''}`}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`${styles.content} ${className || ''}`}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={`${styles.title} ${className || ''}`}>{children}</h3>;
}

export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={`${styles.description} ${className || ''}`}>{children}</p>;
}

export function CardPrice({ amount, compareAmount, className }: { amount: string; compareAmount?: string; className?: string }) {
  return (
    <div className={`${styles.price} ${className || ''}`}>
      <span className={styles.currentPrice}>{amount}</span>
      {compareAmount && <span className={styles.comparePrice}>{compareAmount}</span>}
    </div>
  );
}
