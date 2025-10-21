
import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    color: 'primary' | 'secondary';
}

export const Badge: React.FC<BadgeProps> = ({ children, color }) => {
    const colorClasses = {
        primary: 'bg-brand-primary text-brand-dark',
        secondary: 'bg-pink-500 text-white',
    };

    return (
        <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${colorClasses[color]}`}>
            {children}
        </span>
    );
};
