import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'normal' | 'large';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'normal', children, ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center
      font-semibold text-decoration-none border-none rounded-lg cursor-pointer
      transition-all duration-300 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-blue-500 text-white hover:bg-blue-600
        transform hover:-translate-y-0.5 hover:shadow-lg
        focus:ring-blue-300
      `,
      secondary: `
        bg-gold-500 text-white hover:bg-gold-600
        transform hover:-translate-y-0.5 hover:shadow-lg
        focus:ring-gold-300
      `,
      outline: `
        bg-transparent text-blue-500 border-2 border-blue-500
        hover:bg-blue-500 hover:text-white
        focus:ring-blue-300
      `,
      ghost: `
        bg-transparent text-gold-500 border-2 border-transparent
        hover:bg-gold-50 hover:border-gold-200
        focus:ring-gold-300
      `
    };

    const sizes = {
      small: 'text-sm px-6 py-3',
      normal: 'text-base px-8 py-4',
      large: 'text-lg px-12 py-5'
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export type { ButtonProps };