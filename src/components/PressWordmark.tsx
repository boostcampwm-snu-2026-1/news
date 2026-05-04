import type { CSSProperties } from 'react';
import type { WordmarkProps } from '../types';
import styles from './PressWordmark.module.css';

type Props = WordmarkProps & {
  scale?: number;
};

export default function PressWordmark({ scale, ...p }: Props) {
  const cls = [styles.root];
  if (p.family === 'serif') cls.push(styles.serif);
  if (p.italic) cls.push(styles.italic);
  if (p.underline) cls.push(styles.underline);
  if (p.bg) cls.push(styles.bg);
  if (p.small) cls.push(styles.small);

  const style: CSSProperties = {
    color: p.color,
    fontWeight: p.weight ?? 700,
  };
  if (p.bg) style.background = p.bg;
  if (p.tracking !== undefined) style.letterSpacing = p.tracking;
  else if (p.latin) style.letterSpacing = '0';
  if (scale) style.transform = `scale(${scale})`;
  if (scale) style.transformOrigin = 'left center';

  const chars = [...p.name];
  const accentSet = new Set<number>(
    p.accentChar !== undefined ? [p.accentChar] : [],
  );
  const underSet = new Set<number>(p.accentUnder ?? []);

  return (
    <span className={cls.join(' ')} style={style}>
      {chars.map((ch, i) => {
        const isAccent = accentSet.has(i);
        const isUnder = underSet.has(i);
        const charStyle: CSSProperties = {};
        const classes = [styles.char];

        if (isUnder) classes.push(styles.charUnder);

        if (isAccent && p.accentBg) {
          classes.push(styles.charBg);
          charStyle.background = p.accent;
        } else if (isAccent && p.accent) {
          charStyle.color = p.accent;
        }

        return (
          <span key={i} className={classes.join(' ')} style={charStyle}>
            {ch}
          </span>
        );
      })}
      {p.flag && <span className={styles.flag} aria-hidden="true" />}
    </span>
  );
}
