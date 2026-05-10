import PressLogo from '../data/logos';
import type { Press } from '../types';

interface PressNewsCardProps {
  press: Press;
  isSubscribed: boolean;
  onToggleSubscription: (pressId: string) => void;
  onNext: () => void;
}

export default function PressNewsCard({
  press,
  isSubscribed,
  onToggleSubscription,
  onNext,
}: PressNewsCardProps) {
  const buttonLabel = isSubscribed ? '− 해지하기' : '+ 구독하기';

  return (
    <div className="max-w-[1080px] mx-auto px-4 py-4">
      <div className="flex items-stretch">
        <div className="w-10 shrink-0" />

        <div className="flex-1 border border-[#e0e0e0]">
          <div className="flex items-center gap-4 border-b border-[#e0e0e0] px-4 py-3">
            <div className="h-10 w-[140px]">
              <PressLogo pressId={press.id} fallbackName={press.name} />
            </div>
            <span className="text-sm text-gray-500">{press.editedAt}</span>
            <div className="ml-auto">
              <button
                type="button"
                onClick={() => onToggleSubscription(press.id)}
                className="rounded-full border border-gray-300 bg-[#f0f0f0] px-3 py-1 text-sm text-gray-700 hover:bg-[#e6e6e6] transition-colors"
              >
                {buttonLabel}
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="flex-none w-[230px] border-r border-[#e0e0e0] p-4">
              <div className="flex h-[188px] w-full items-center justify-center bg-gray-200">
                <span className="text-sm text-gray-400">headline image</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between px-5 py-3">
              <ul className="space-y-[7px]">
                {press.headlines.map((headline, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-snug">
                    <span className="mt-[1px] select-none text-gray-400">•</span>
                    <span>{headline}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-gray-400">
                {press.name} 언론사에서 직접 편집한 뉴스입니다.
              </p>
            </div>
          </div>

          <div className="border-t border-[#e0e0e0] px-4 py-3">
            <p className="text-sm font-bold">{press.mainHeadline}</p>
          </div>
        </div>

        <div className="flex w-10 shrink-0 items-center justify-center">
          <button
            type="button"
            aria-label="다음 언론사"
            onClick={onNext}
            className="p-2 text-gray-400 transition-colors hover:text-gray-700"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path
                d="M1 1l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
