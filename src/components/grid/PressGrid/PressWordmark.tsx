import type { Press } from '../../../types/press';

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
      className="inline-flex items-center justify-center font-[var(--font-primary)] text-[14px] leading-[1.15] select-none gap-[2px]"
      style={{
        fontWeight: style.weight,
        fontStyle: style.italic ? 'italic' : 'normal',
      }}
    >
      {renderName()}
      {style.flag && <span className="text-[10px] ml-[2px]">🚩</span>}
    </div>
  );
};

export default PressWordmark;
