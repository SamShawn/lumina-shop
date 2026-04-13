'use client';

import styles from './OptionSelector.module.css';

interface OptionSelectorProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  label?: string;
}

export function OptionSelector({ options, selected, onChange, label }: OptionSelectorProps) {
  return (
    <div className={styles.options} role="group" aria-label={label || 'Select option'}>
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
