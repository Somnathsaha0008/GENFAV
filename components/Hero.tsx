
import React from 'react';
import { Button } from './Button';

export const Hero: React.FC = () => {
    return (
        <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                    alt="Fashion model"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-4 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider mb-4">
                    Define Your <span className="text-brand-primary">Vibe</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-brand-light mb-8">
                    Discover exclusive drops and premium essentials. Streetwear that speaks your language.
                </p>
                <Button variant="primary" onClick={() => document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' })}>
                    Explore Collection
                </Button>
            </div>
        </div>
    );
};
