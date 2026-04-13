'use client';

import styles from './OptionSelector.module.css';

interface OptionSelectorProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export function OptionSelector({ options, selected, onChange }: OptionSelectorProps) {
  return (
    <div className={styles.options} role="group" aria-label="Select option">
      {options.map((option) => (
        <button
          key={option}
          className={[styles.option, selected === option ? styles.selected : ''].join(' ')}
          onClick={() => onChange(option)}
          aria-pressed={selected === option}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
