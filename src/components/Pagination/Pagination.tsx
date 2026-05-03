interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded border border-border text-text-secondary hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg"
        aria-label="이전 페이지"
      >
        &#8249;
      </button>

      <span className="text-sm text-text-secondary tabular-nums">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded border border-border text-text-secondary hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg"
        aria-label="다음 페이지"
      >
        &#8250;
      </button>
    </div>
  );
}
