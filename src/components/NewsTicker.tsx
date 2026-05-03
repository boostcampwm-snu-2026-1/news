import { TICKER_ITEMS } from '../data/mockData';

export default function NewsTicker() {
  return (
    <div className="bg-white py-3">
      <div className="max-w-[1080px] mx-auto px-4 flex gap-3">
        {TICKER_ITEMS.map((item) => (
          <div
            key={item.pressName}
            className="flex-1 bg-[#f5f5f5] px-4 py-2 flex items-center min-w-0 text-sm"
          >
            <span className="font-bold shrink-0 mr-3">{item.pressName}</span>
            <span className="truncate text-gray-700">{item.headline}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
