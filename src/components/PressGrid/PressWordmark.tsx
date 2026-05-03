import { Press } from '../../data/pressData';
import styles from './PressWordmark.module.css';

interface PressWordmarkProps {
  press: Press;
}

const PressWordmark = ({ press }: PressWordmarkProps) => {
  const { name, style } = press;

  const renderName = () => {
    return name.split('').map((char, index) => {
      const isAccent = style.accent && style.accent.charIndex === index;
      
      return (
        <span 
          key={index}
          style={{ 
            color: isAccent ? '#FFFFFF' : (style.color || 'inherit'),
            backgroundColor: isAccent ? style.accent?.color : 'transparent',
            padding: isAccent ? '0 2px' : '0'
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div 
      className={styles.wordmark}
      style={{
        fontWeight: style.weight,
        fontStyle: style.italic ? 'italic' : 'normal',
      }}
    >
      {renderName()}
      {style.flag && <span className={styles.flag}>🚩</span>} 
      {/* 🚩는 임시 아이콘, 나중에 디자인 시스템에 맞게 조정 가능 */}
    </div>
  );
};

export default PressWordmark;
