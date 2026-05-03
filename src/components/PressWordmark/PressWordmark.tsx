import type { CSSProperties, ReactNode } from 'react';
import type { WordmarkStyle } from '@/types/press';
import styles from './PressWordmark.module.css';

type PressWordmarkProps = {
  name: string;
  style: WordmarkStyle;
};

/**
 * 언론사 이름을 워드마크로 렌더한다 (디자인 시스템 §6.5).
 * - bg가 있으면 전체 단어를 chip으로 감싸고 color로 텍스트 색 지정
 * - accentChar / accentUnder가 있으면 chars를 분해해서 char 단위 스타일링
 * - flag가 있으면 끝에 빨간 깃발 glyph
 * - latin이면 한글 letter-spacing 비활성화
 * - small이면 14px (긴 latin 이름용)
 */
export function PressWordmark({ name, style }: PressWordmarkProps) {
  const {
    color,
    bg,
    weight = 700,
    family = 'sans',
    italic,
    underline,
    tracking,
    accent,
    accentChar,
    accentUnder,
    accentBg,
    flag,
    latin,
    small,
  } = style;

  // 컨테이너에 inline style — 색·트래킹·weight (CSS module로 표현하기 어려운 가변값들)
  const containerStyle: CSSProperties = {
    fontWeight: weight,
    color: color ?? 'var(--ink)',
  };
  if (bg) {
    containerStyle.background = bg;
  }
  // tracking 우선 → latin이면 0 → 그 외엔 module의 -0.01em 한글 기본값 유지
  if (tracking !== undefined) {
    containerStyle.letterSpacing = tracking;
  } else if (latin) {
    containerStyle.letterSpacing = '0';
  }

  const classNames = [
    styles.wordmark,
    family === 'serif' ? styles.serif : styles.sans,
    small ? styles.small : styles.size16,
    italic ? styles.italic : '',
    underline ? styles.underline : '',
    bg ? styles.chip : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} style={containerStyle}>
      {renderText({ name, accent, accentChar, accentUnder, accentBg })}
      {flag && <FlagGlyph />}
    </span>
  );
}

type RenderTextArgs = {
  name: string;
  accent?: string;
  accentChar?: number;
  accentUnder?: number[];
  accentBg?: boolean;
};

function renderText({
  name,
  accent,
  accentChar,
  accentUnder,
  accentBg,
}: RenderTextArgs): ReactNode {
  const hasPerChar =
    accent !== undefined && (accentChar !== undefined || (accentUnder?.length ?? 0) > 0);

  if (!hasPerChar) {
    return name;
  }

  const chars = Array.from(name);
  return chars.map((ch, i) => {
    const isAccentChar = i === accentChar;
    const isUnderChar = accentUnder?.includes(i) ?? false;

    if (!isAccentChar && !isUnderChar) {
      return <span key={i}>{ch}</span>;
    }

    const charStyle: CSSProperties = {};
    const charClasses: string[] = [];

    if (isAccentChar && accent) {
      if (accentBg) {
        charStyle.background = accent;
        charClasses.push(styles.accentBg);
      } else {
        charStyle.color = accent;
        charClasses.push(styles.accentChar);
      }
    }

    if (isUnderChar && accent) {
      charStyle.color = accent;
      charClasses.push(styles.accentUnder);
    }

    return (
      <span key={i} className={charClasses.join(' ')} style={charStyle}>
        {ch}
      </span>
    );
  });
}

/** 빨간 깃발 — 아시아경제·아주경제 등 */
function FlagGlyph() {
  return (
    <svg
      className={styles.flag}
      viewBox="0 0 9 11"
      fill="#E53935"
      stroke="#E53935"
      strokeWidth={1}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M1 1 L8 3 L1 5 Z" />
      <line x1="1" y1="0.5" x2="1" y2="10.5" />
    </svg>
  );
}
