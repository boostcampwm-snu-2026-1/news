import { useState } from 'react';
import styles from './PressCell.module.css';

function getFaviconUrl(url) {
  return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=128`;
}

export default function PressCell({ press, isSubscribed, onSubscribe, onUnsubscribe }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div className={styles.cell}>
      <img
        src={logoFailed ? getFaviconUrl(press.url) : press.logo}
        alt={press.name}
        className={styles.logo}
        onError={() => setLogoFailed(true)}
      />
      <span className={styles.name}>{press.name}</span>

      <div className={styles.overlay}>
        {isSubscribed ? (
          <button className={styles.overlayBtn} onClick={() => onUnsubscribe(press.id)}>
            해지하기
          </button>
        ) : (
          <button className={styles.overlayBtn} onClick={() => onSubscribe(press.id)}>
            구독
          </button>
        )}
        <button
          className={styles.overlayBtn}
          onClick={() => window.open(press.url, '_blank', 'noopener,noreferrer')}
        >
          기사보기
        </button>
      </div>
    </div>
  );
}
