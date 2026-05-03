import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import PressCell from './PressCell';
import styles from './PressGrid.module.css';

function Grid({ items, className, isExiting, subscribedIds, onSubscribe, onUnsubscribe }) {
  return (
    <div className={`${isExiting ? styles.exitLayer : ''} ${styles.grid} ${className || ''}`}>
      {items.map((press) => (
        <PressCell
          key={press.id}
          press={press}
          isSubscribed={subscribedIds.has(press.id)}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        />
      ))}
    </div>
  );
}

export default function PressGrid({ items, currentPage, totalPages, onPageChange, direction, isEmpty, subscribedIds, onSubscribe, onUnsubscribe }) {
  const prevPageRef = useRef(currentPage);
  const prevItemsRef = useRef(items);
  const [snapshot, setSnapshot] = useState(null);

  useLayoutEffect(() => {
    if (currentPage === prevPageRef.current || !direction) {
      prevPageRef.current = currentPage;
      prevItemsRef.current = items;
      return;
    }

    const oldItems = prevItemsRef.current;
    const isNext = currentPage > prevPageRef.current;

    prevPageRef.current = currentPage;
    prevItemsRef.current = items;

    setSnapshot({
      items: oldItems,
      exitClass: isNext ? styles.exitToLeft : styles.exitToRight,
      enterClass: isNext ? styles.slideFromRight : styles.slideFromLeft,
    });
  }, [currentPage, items, direction]);

  useEffect(() => {
    if (!snapshot) return;
    const t = setTimeout(() => setSnapshot(null), 300);
    return () => clearTimeout(t);
  }, [snapshot]);

  if (isEmpty) {
    return <div className={styles.empty}>구독한 언론사가 없습니다.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <button
          className={styles.arrow}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          aria-label="이전 페이지"
        >
          &#8249;
        </button>

        <div className={styles.gridWrap}>
          {snapshot && (
            <Grid
              items={snapshot.items}
              className={snapshot.exitClass}
              isExiting
              subscribedIds={subscribedIds}
              onSubscribe={onSubscribe}
              onUnsubscribe={onUnsubscribe}
            />
          )}
          <Grid
            items={items}
            className={snapshot ? snapshot.enterClass : ''}
            subscribedIds={subscribedIds}
            onSubscribe={onSubscribe}
            onUnsubscribe={onUnsubscribe}
          />
        </div>

        <button
          className={styles.arrow}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          aria-label="다음 페이지"
        >
          &#8250;
        </button>
      </div>

      <div className={styles.pageIndicator}>
        {currentPage + 1} / {totalPages}
      </div>
    </div>
  );
}
