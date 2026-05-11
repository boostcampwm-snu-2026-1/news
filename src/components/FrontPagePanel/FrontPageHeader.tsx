import { useState } from 'react';
import type { Publisher, FrontPage } from '../../types';

interface FrontPageHeaderProps {
  publisher: Publisher;
  editedAt: FrontPage['editedAt'];
  isSubscribed: boolean;
  onToggleSubscribe: (id: string) => void;
}

function formatEditedAt(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `편집 ${hh}:${mm}`;
}

export function FrontPageHeader({ publisher, editedAt, isSubscribed, onToggleSubscribe }: FrontPageHeaderProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="flex flex-col px-3 pt-2.5 pb-2 border-b border-border shrink-0 gap-1.5">
      <div className="flex items-center justify-between">
        {logoError ? (
          <span className="font-bold text-base text-text-primary">{publisher.name}</span>
        ) : (
          <img
            src={publisher.logoUrl}
            alt={publisher.name}
            className="h-8 object-contain"
            onError={() => setLogoError(true)}
          />
        )}
        <span className="text-xs text-text-secondary tabular-nums">
          {formatEditedAt(editedAt)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onToggleSubscribe(publisher.id)}
          className={`text-[10px] border rounded px-1 py-px transition-colors duration-150 ${
            isSubscribed
              ? 'text-primary border-primary font-bold'
              : 'text-text-secondary border-border hover:border-text-secondary'
          }`}
        >
          {isSubscribed ? '구독중' : '구독하기'}
        </button>
        {['이용자 한마디', '공유'].map((label) => (
          <button
            key={label}
            type="button"
            className="text-[10px] text-text-secondary border border-border rounded px-1 py-px hover:border-text-secondary transition-colors duration-150"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
