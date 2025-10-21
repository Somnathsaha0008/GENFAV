import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseClasses = 'px-6 py-3 font-semibold rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark uppercase tracking-wider text-sm';

    const variantClasses = {
        primary: 'bg-brand-primary text-brand-dark hover:bg-opacity-90 focus:ring-brand-primary',
        secondary: 'bg-gray-700 text-brand-light hover:bg-gray-600 focus:ring-gray-500',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};