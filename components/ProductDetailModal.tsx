
import React, { useState } from 'react';
import type { Product, Size } from '../types';
import { ICONS } from '../constants';
import { Badge } from './Badge';
import { Button } from './Button';

interface ProductDetailModalProps {
    product: Product | null;
    onClose: () => void;
    onAddToCart: (product: Product, size: Size, color: string) => void;
    onToggleWishlist: (productId: number) => void;
    isWishlisted: boolean;
    onWriteReview: (product: Product) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <div key={i} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-600'}>
                {ICONS.star}
            </div>
        ))}
    </div>
);

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart, onToggleWishlist, isWishlisted, onWriteReview }) => {
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    if (!product) return null;

    const handleAddToCart = () => {
        if (selectedSize && selectedColor) {
            onAddToCart(product, selectedSize, selectedColor);
            onClose();
        } else {
            alert('Please select a size and color.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="relative bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
                    {ICONS.close}
                </button>
                
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                    {product.isNew && <Badge color="primary">New Arrival</Badge>}
                    <h2 className="text-3xl font-bold text-white mt-2 mb-2">{product.name}</h2>
                    <p className="text-gray-400 text-sm mb-4">{product.category}</p>
                    
                    <div className="flex items-center space-x-2 mb-4">
                        <StarRating rating={product.rating} />
                        <span className="text-gray-400 text-sm">({product.reviewCount} reviews)</span>
                    </div>

                    <p className="text-3xl font-bold text-white mb-6">
                        ${product.price.toFixed(2)}
                        {product.originalPrice && <span className="ml-3 text-xl line-through text-gray-500">${product.originalPrice.toFixed(2)}</span>}
                    </p>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>
                    
                    {/* Sizes */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-white mb-3">Size</h4>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map(size => (
                                <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-md text-sm transition-colors ${selectedSize === size ? 'bg-brand-primary text-brand-dark border-brand-primary' : 'bg-gray-800 border-gray-700 text-white hover:border-brand-primary'}`}>
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                     <div className="mb-6">
                        <h4 className="font-semibold text-white mb-3">Color</h4>
                        <div className="flex flex-wrap gap-3">
                            {product.colors.map(color => (
                                <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 ${selectedColor === color ? 'border-brand-primary scale-110' : 'border-transparent'}`} style={{ backgroundColor: color }} aria-label={color} />
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                         <Button variant="primary" onClick={handleAddToCart} disabled={!selectedSize || !selectedColor} className="flex-1">Add to Bag</Button>
                         <button onClick={() => onToggleWishlist(product.id)} className={`p-3 rounded-md transition-colors ${isWishlisted ? 'bg-brand-primary text-brand-dark' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                            {isWishlisted ? ICONS.heartFilled : ICONS.heart}
                         </button>
                    </div>

                    {/* Reviews */}
                    <div className="mt-8 border-t border-gray-800 pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-white text-lg">Reviews ({product.reviews.length})</h4>
                            <button onClick={() => onWriteReview(product)} className="text-sm text-brand-primary hover:underline">Write a Review</button>
                        </div>
                        <div className="space-y-4 max-h-40 overflow-y-auto pr-2">
                            {product.reviews.length > 0 ? product.reviews.map(review => (
                                <div key={review.id} className="border-b border-gray-800 pb-2">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-bold text-white">{review.author}</h5>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-gray-400 text-xs mb-2">{review.date}</p>
                                    <p className="text-gray-300 text-sm">{review.comment}</p>
                                </div>
                            )) : <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
