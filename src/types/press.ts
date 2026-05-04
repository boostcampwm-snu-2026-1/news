export interface PressWordmarkProps {
  name: string;
  color?: string;       // 글자 색상 (Hex 또는 CSS 변수)
  bg?: string;          // 배경 색상
  weight?: 'normal' | 'bold' | number;
  fontFamily?: 'sans' | 'serif';
  italic?: boolean;
  underline?: boolean;
  tracking?: string;    // 자간 (letter-spacing)
  flag?: string;        // 로고 뒤에 붙는 작은 태그 (예: '경제')
  fontSize?: string;    // 기본값 외 커스텀 크기 필요 시
}