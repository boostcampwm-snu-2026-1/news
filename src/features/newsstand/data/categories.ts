import type { PressCategory, PressCategoryStat } from "../types";

export const categoryLabels: Record<PressCategory, string> = {
  general: "종합/경제",
  broadcast: "방송/통신",
  it: "IT",
  sports: "스포츠/연예",
  magazine: "매거진/전문지",
  local: "지역",
};

export const categoryOrder = Object.keys(categoryLabels) as PressCategory[];

export function createCategoryStats(primaryCategory: PressCategory, seed: number): PressCategoryStat[] {
  return categoryOrder.map((category, index) => ({
    key: category,
    label: categoryLabels[category],
    count: category === primaryCategory ? 81 : 18 + ((seed + index * 7) % 54),
  }));
}
