import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = ''
}: ButtonProps) => {
  const baseStyles = "px-4 py-3 rounded font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;