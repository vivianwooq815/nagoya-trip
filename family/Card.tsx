
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ 
  children, className = "", onClick 
}) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-2xl shadow-soft p-4 border border-k-green-light transition-all ${onClick ? 'active:scale-[0.98] cursor-pointer' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Badge: React.FC<{ color: string; text: string }> = ({ color, text }) => (
  <span className={`${color} text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm`}>
    {text}
  </span>
);

export const RoundedButton: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' 
}> = ({ 
  children, className = "", onClick, variant = 'primary' 
}) => {
  const variants = {
    primary: 'bg-k-green text-white',
    secondary: 'bg-k-green-light text-k-green-dark',
    accent: 'bg-k-accent text-white'
  };
  return (
    <button 
      onClick={onClick}
      className={`${variants[variant]} px-4 py-2 rounded-full font-bold shadow-sm active:scale-95 transition-all text-sm ${className}`}
    >
      {children}
    </button>
  );
};
