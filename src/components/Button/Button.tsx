import React from "react";

export interface ButtonProps {
  type: 'button' | 'submit';
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  const { type, onClick, children, className, ...otherProps } = props;
  return <button onClick={onClick} type={type} className={`tcg-button ${className}`} {...otherProps}>{children}</button>;
};

export default Button;
