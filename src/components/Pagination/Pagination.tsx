interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded border border-border text-text-secondary hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        이전
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={[
            'w-9 h-9 text-sm rounded border transition-colors font-medium',
            page === currentPage
              ? 'border-primary bg-primary text-white'
              : 'border-border text-text-secondary hover:border-primary hover:text-primary',
          ].join(' ')}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded border border-border text-text-secondary hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        다음
      </button>
    </div>
  );
}
