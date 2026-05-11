import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { PANEL_W, PEEK_PAD, BASE, NEXT, PREV, BTN_LEFT, BTN_RIGHT } from './carouselLayout';
import { NavButton } from './NavButton';

export interface CarouselHandle {
  slideNext: () => void;
  slidePrev: () => void;
}

interface CarouselProps {
  count: number;
  activeIndex: number;
  onIndexChange: (index: number) => void;
  renderPanel: (index: number, isActive: boolean) => React.ReactNode;
  prevLabel?: string;
  nextLabel?: string;
}

export const Carousel = forwardRef<CarouselHandle, CarouselProps>(function Carousel(
  { count, activeIndex, onIndexChange, renderPanel, prevLabel, nextLabel },
  ref,
) {
  const [transform, setTransform] = useState(BASE);
  const [animated, setAnimated] = useState(false);
  const [sliding, setSliding] = useState(false);
  const dirRef = useRef<'prev' | 'next' | null>(null);

  const prevIdx = (activeIndex - 1 + count) % count;
  const nextIdx = (activeIndex + 1) % count;

  function slide(dir: 'prev' | 'next') {
    if (sliding || count <= 1) return;
    dirRef.current = dir;
    setSliding(true);
    setAnimated(true);
    setTransform(dir === 'next' ? NEXT : PREV);
  }

  useImperativeHandle(ref, () => ({
    slideNext: () => slide('next'),
    slidePrev: () => slide('prev'),
  }));

  function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    const dir = dirRef.current;
    onIndexChange(dir === 'next' ? nextIdx : prevIdx);
    setAnimated(false);
    setTransform(BASE);
    setSliding(false);
    dirRef.current = null;
  }

  if (count === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        style={{
          display: 'flex',
          transform: `translateX(${transform})`,
          transition: animated ? 'transform 250ms ease-out' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {([prevIdx, activeIndex, nextIdx] as const).map((idx, i) => (
          <div
            key={i}
            style={{ width: PANEL_W, flexShrink: 0 }}
            className={`transition-opacity duration-200 ${
              i === 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'
            }`}
          >
            <div style={{ paddingRight: i === 0 ? PEEK_PAD : 0, paddingLeft: i === 2 ? PEEK_PAD : 0 }}>
              {renderPanel(idx, i === 1)}
            </div>
          </div>
        ))}
      </div>

      <NavButton dir="prev" left={BTN_LEFT} disabled={sliding} label={prevLabel} onClick={() => slide('prev')} />
      <NavButton dir="next" left={BTN_RIGHT} disabled={sliding} label={nextLabel} onClick={() => slide('next')} />
    </div>
  );
});
