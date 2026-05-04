import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2.5V9.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 6H9.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;