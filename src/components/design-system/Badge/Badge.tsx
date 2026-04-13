import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'muted' | 'warm';
  className?: string;
}

export function Badge({ children, variant = 'accent', className }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant], className || ''].join(' ')}>
      {children}
    </span>
  );
}
