
import React from 'react';
import { ICONS } from '../constants';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="mb-6 md:mb-0">
                         <a href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 text-brand-primary">{ICONS.logo}</div>
                            <span className="text-xl font-black uppercase tracking-wider text-white">GENFAV</span>
                        </a>
                        <p className="text-brand-gray text-sm">Wear Your Vibe.</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-white uppercase tracking-wider mb-4">Shop</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-brand-primary transition-colors">New Drops</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Men</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Women</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Accessories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Shipping</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Returns</a></li>
                        </ul>
                    </div>

                    {/* Newsletter & Social */}
                    <div>
                         <h3 className="font-semibold text-white uppercase tracking-wider mb-4">Join The Vibe</h3>
                         <p className="text-brand-gray mb-4 text-sm">Get exclusive access to new drops and sales.</p>
                         <form className="flex">
                            <input type="email" placeholder="Enter your email" className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-primary flex-grow font-sans" />
                            <button type="submit" className="bg-brand-primary text-brand-dark font-bold px-4 rounded-r-md">Go</button>
                         </form>
                         <div className="flex space-x-4 mt-6">
                            <a href="#" aria-label="Twitter">{ICONS.twitter}</a>
                            <a href="#" aria-label="Instagram">{ICONS.instagram}</a>
                            <a href="#" aria-label="Facebook">{ICONS.facebook}</a>
                         </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-brand-gray text-sm">
                    <p>&copy; {new Date().getFullYear()} GENFAV. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};
