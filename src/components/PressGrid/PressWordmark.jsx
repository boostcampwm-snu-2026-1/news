import styles from './PressWordmark.module.css';

const PressWordmark = ({ press }) => {
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
    </div>
  );
};

export default PressWordmark;
