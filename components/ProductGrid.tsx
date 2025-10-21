
import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
    products: Product[];
    onViewDetails: (product: Product) => void;
    onToggleWishlist: (productId: number) => void;
    wishlist: number[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onViewDetails, onToggleWishlist, wishlist }) => {
    if (products.length === 0) {
        return (
            <div className="w-full text-center py-20">
                <h2 className="text-2xl font-semibold text-white mb-2">No Products Found</h2>
                <p className="text-brand-gray">Try adjusting your filters or search terms.</p>
            </div>
        );
    }
    
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onViewDetails={onViewDetails}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                />
            ))}
        </div>
    );
};
