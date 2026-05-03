import { useEffect } from 'react';
import type { Publisher } from '../../types';

interface SubscribeModalProps {
  publisher: Publisher;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SubscribeModal({ publisher, onConfirm, onCancel }: SubscribeModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-80 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1">
          <h2 id="modal-title" className="text-base font-bold text-text-primary">
            구독 해지
          </h2>
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">{publisher.name}</span> 구독을
            해지하시겠습니까?
          </p>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded border border-border text-text-secondary hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold"
          >
            해지
          </button>
        </div>
      </div>
    </div>
  );
}
