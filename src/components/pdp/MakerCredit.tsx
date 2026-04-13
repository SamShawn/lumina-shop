import styles from './MakerCredit.module.css';

interface MakerCreditProps {
  maker: { name: string; location?: string };
}

export function MakerCredit({ maker }: MakerCreditProps) {
  return (
    <div className={styles.credit}>
      <span className={styles.label}>Maker</span>
      <span className={styles.name}>
        {maker.name}
        {maker.location && ` — ${maker.location}`}
      </span>
    </div>
  );
}
