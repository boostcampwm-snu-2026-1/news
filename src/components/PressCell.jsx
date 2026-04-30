import { useState } from 'react';
import styles from './PressCell.module.css';

function getFaviconUrl(url) {
  return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=128`;
}

export default function PressCell({ press }) {
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
    </div>
  );
}
