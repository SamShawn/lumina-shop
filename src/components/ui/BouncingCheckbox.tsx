'use client';

import { useState } from 'react';
import styles from './BouncingCheckbox.module.css';

interface BouncingCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function BouncingCheckbox({ label, onChange, checked, ...props }: BouncingCheckboxProps) {
  const [bouncing, setBouncing] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 300);
    onChange?.(e);
  }

  return (
    <label className={styles.option}>
      <input
        type="checkbox"
        className={`${styles.input} ${bouncing ? styles.bounce : ''}`}
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
