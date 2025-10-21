
import React from 'react';
import type { Product } from '../types';
import { ICONS } from '../constants';
import { Button } from './Button';

interface WishlistModalProps {
    wishlistItems: Product[];
    onClose: () => void;
    onViewDetails: (product: Product) => void;
    onRemoveFromWishlist: (productId: number) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({ wishlistItems, onClose, onViewDetails, onRemoveFromWishlist }) => {
    
    const handleViewDetails = (product: Product) => {
        onViewDetails(product);
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end animate-slide-in-right" onClick={onClose}>
            <div className="relative bg-gray-900 w-full max-w-md h-full flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-white">Wishlist ({wishlistItems.length})</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        {ICONS.close}
                    </button>
                </div>
                
                {/* Items */}
                {wishlistItems.length > 0 ? (
                    <div className="flex-1 overflow-y-auto p-6">
                        <ul className="space-y-4">
                            {wishlistItems.map(item => (
                                <li key={item.id} className="flex items-center space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white">{item.name}</h3>
                                        <p className="text-gray-400">${item.price.toFixed(2)}</p>
                                        <button onClick={() => handleViewDetails(item)} className="text-sm text-brand-primary hover:underline mt-1">View Details</button>
                                    </div>
                                    <button onClick={() => onRemoveFromWishlist(item.id)} className="text-gray-500 hover:text-red-500 transition-colors" aria-label="Remove from wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <div className="text-gray-500 mb-4">{ICONS.heart}</div>
                        <h3 className="text-xl font-semibold text-white">Your Wishlist is Empty</h3>
                        <p className="text-gray-400 mt-2">Add items you love to your wishlist to see them here.</p>
                        <Button variant="primary" onClick={onClose} className="mt-6">Continue Shopping</Button>
                    </div>
                )}
            </div>
        </div>
    );
};
