import React from 'react';
import styles from './PressWordmark.module.css';
import { PressWordmarkProps } from '@/types/press';

const PressWordmark: React.FC<PressWordmarkProps> = ({
  name,
  color,
  bg,
  weight = 'bold',
  fontFamily = 'sans',
  italic = false,
  underline = false,
  tracking = 'normal',
  flag,
  fontSize,
}) => {
  const dynamicStyle: React.CSSProperties = {
    color: color,
    backgroundColor: bg,
    fontWeight: weight,
    letterSpacing: tracking,
    fontSize: fontSize,
  };

  const containerClass = [
    styles.wordmark,
    styles[fontFamily],
    italic ? styles.italic : '',
    underline ? styles.underline : '',
  ].join(' ');

  return (
    <div className={containerClass} style={dynamicStyle}>
      <span>{name}</span>
      {flag && <span className={styles.flag}>{flag}</span>}
    </div>
  );
};

export default PressWordmark;