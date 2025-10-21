
import React from 'react';
import type { Product } from '../types';
import { ICONS } from '../constants';
import { Badge } from './Badge';

interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
    onToggleWishlist: (productId: number) => void;
    isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onToggleWishlist, isWishlisted }) => {
    const { name, price, originalPrice, imageUrl, rating, reviewCount, isNew } = product;

    return (
        <div className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/20 transform hover:-translate-y-1">
            <div className="absolute top-3 left-3 z-10">
                {isNew && <Badge color="primary">New</Badge>}
            </div>
            <button
                onClick={() => onToggleWishlist(product.id)}
                className="absolute top-3 right-3 z-10 text-white rounded-full p-2 bg-black/40 hover:bg-brand-primary transition-colors duration-300"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
                {isWishlisted ? ICONS.heartFilled : ICONS.heart}
            </button>
            <div className="relative w-full h-80 overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={(e) => { e.stopPropagation(); onViewDetails(product); }} className="w-full bg-brand-primary text-brand-dark font-bold py-2 rounded-md">
                            Quick View
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4 text-white">
                <h3 className="font-semibold truncate text-lg">{name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-bold">
                        ${price.toFixed(2)}
                        {originalPrice && <span className="text-sm line-through text-gray-400 ml-2">${originalPrice.toFixed(2)}</span>}
                    </p>
                    <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">{ICONS.star}</span>
                        <span className="text-sm text-gray-300">{rating.toFixed(1)} ({reviewCount})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
