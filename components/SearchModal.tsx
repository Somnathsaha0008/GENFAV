
import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { ICONS } from '../constants';

interface SearchModalProps {
    allProducts: Product[];
    onClose: () => void;
    onViewDetails: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ allProducts, onClose, onViewDetails }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Product[]>([]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setResults([]);
            return;
        }

        const lowercasedTerm = searchTerm.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(lowercasedTerm) ||
            product.category.toLowerCase().includes(lowercasedTerm) ||
            product.description.toLowerCase().includes(lowercasedTerm)
        );
        setResults(filteredProducts);
    }, [searchTerm, allProducts]);
    
    const handleProductClick = (product: Product) => {
        onViewDetails(product);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center p-4 pt-[10vh] animate-fade-in" onClick={onClose}>
            <div className="relative bg-gray-900 w-full max-w-2xl h-fit max-h-[80vh] rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
                    {ICONS.close}
                </button>
                
                {/* Search Input */}
                <div className="p-6 border-b border-gray-800">
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            {ICONS.search}
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for products..."
                            autoFocus
                            className="w-full bg-gray-800 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-lg font-sans"
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="overflow-y-auto max-h-[calc(80vh-100px)]">
                    {searchTerm && results.length === 0 && (
                        <div className="text-center p-8 text-gray-400">
                            <p>No results found for "{searchTerm}"</p>
                        </div>
                    )}
                    <ul className="divide-y divide-gray-800">
                        {results.map(product => (
                            <li key={product.id} className="p-4 hover:bg-gray-800 transition-colors">
                                <button onClick={() => handleProductClick(product)} className="w-full flex items-center space-x-4 text-left">
                                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md"/>
                                    <div>
                                        <h4 className="font-semibold text-white">{product.name}</h4>
                                        <p className="text-sm text-gray-400">{product.category}</p>
                                    </div>
                                    <p className="ml-auto font-semibold text-white">${product.price.toFixed(2)}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
