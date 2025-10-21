
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

interface HeaderProps {
    wishlistCount: number;
    cartCount: number;
    onSearchClick: () => void;
    onWishlistClick: () => void;
    onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ wishlistCount, cartCount, onSearchClick, onWishlistClick, onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 text-brand-primary">{ICONS.logo}</div>
                        <span className="text-xl font-black uppercase tracking-wider text-white">GENFAV</span>
                    </a>
                    
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-sm font-semibold text-white hover:text-brand-primary transition-colors">New Drops</a>
                        <a href="#" className="text-sm font-semibold text-white hover:text-brand-primary transition-colors">Men</a>
                        <a href="#" className="text-sm font-semibold text-white hover:text-brand-primary transition-colors">Women</a>
                        <a href="#" className="text-sm font-semibold text-white hover:text-brand-primary transition-colors">Sale</a>
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <button onClick={onSearchClick} className="text-white hover:text-brand-primary transition-colors" aria-label="Search">
                            {ICONS.search}
                        </button>
                        <button onClick={onWishlistClick} className="relative text-white hover:text-brand-primary transition-colors" aria-label="Wishlist">
                            {ICONS.heart}
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-brand-dark">{wishlistCount}</span>
                            )}
                        </button>
                        <button onClick={onCartClick} className="relative text-white hover:text-brand-primary transition-colors" aria-label="Shopping Bag">
                            {ICONS.bag}
                             {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-brand-dark">{cartCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
