export function getPageItems<T>(items: T[], page: number, pageSize: number): T[] {
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
}

export function getLastPage(itemsLength: number, pageSize: number): number {
  return Math.max(0, Math.ceil(itemsLength / pageSize) - 1);
}
