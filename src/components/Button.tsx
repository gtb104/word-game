import "./Button.css";
import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isPrimary?: boolean;
  onClick?: () => void;
}

const Button = ({ children, className, isPrimary, onClick, ...rest }: ButtonProps) => {
  return (
    <button
      className={`my-button ${isPrimary ? "primary": ""} ${className || ""}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
