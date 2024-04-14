import './style.css';

type ButtonType = {
  size: 'big' | 'small';
  type: 'primary' | 'secondary';
  text: string;
  onClick: () => void;
}

export const Button = ({ size, type, text, onClick }: ButtonType) => {
  return (
    <button id="button" className={`button-${size} button-${type}`} onClick={onClick}>{text}</button>
  );
}
