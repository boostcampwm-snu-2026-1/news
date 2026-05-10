export const CATEGORIES = [
  '종합/경제',
  '방송/통신',
  'IT',
  '스포츠/연예',
  '매거진/전문지',
  '지역'
] as const;

export type Category = typeof CATEGORIES[number];
