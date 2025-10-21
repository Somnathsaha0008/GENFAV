
import React from 'react';
import type { Filters, Category, Size } from '../types';

interface FilterSidebarProps {
    filters: Filters;
    onFiltersChange: (filters: Filters) => void;
    allCategories: Category[];
    allSizes: Size[];
    allColors: string[];
    onOpenSizeGuide: () => void;
}

const SortDropdown: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
);


export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange, allCategories, allSizes, allColors, onOpenSizeGuide }) => {
    
    const handleCategoryChange = (category: Category) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter(c => c !== category)
            : [...filters.categories, category];
        onFiltersChange({ ...filters, categories: newCategories });
    };

    const handleSizeChange = (size: Size) => {
        const newSizes = filters.sizes.includes(size)
            ? filters.sizes.filter(s => s !== size)
            : [...filters.sizes, size];
        onFiltersChange({ ...filters, sizes: newSizes });
    };

     const handleColorChange = (color: string) => {
        const newColors = filters.colors.includes(color)
            ? filters.colors.filter(c => c !== color)
            : [...filters.colors, color];
        onFiltersChange({ ...filters, colors: newColors });
    };
    
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFiltersChange({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] });
    };
    
    const handleSortChange = (sort: string) => {
        onFiltersChange({ ...filters, sort: sort as Filters['sort'] });
    };

    const clearFilters = () => {
        onFiltersChange({
            categories: [],
            sizes: [],
            colors: [],
            priceRange: [0, 100],
            sort: 'newest',
        });
    };

    return (
        <aside className="w-full lg:w-1/4 xl:w-1/5">
            <div className="sticky top-24 space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Filters</h2>
                     <button onClick={clearFilters} className="text-sm text-brand-gray hover:text-white transition-colors">Clear All</button>
                </div>

                {/* Sort */}
                 <div>
                    <h3 className="font-semibold text-white mb-3">Sort By</h3>
                    <SortDropdown value={filters.sort} onChange={handleSortChange} />
                </div>
                
                {/* Categories */}
                <div>
                    <h3 className="font-semibold text-white mb-3">Category</h3>
                    <div className="space-y-2">
                        {allCategories.map(category => (
                             <label key={category} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-brand-primary focus:ring-brand-primary"
                                />
                                <span className="text-brand-light">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Sizes */}
                 <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-white">Size</h3>
                        <button onClick={onOpenSizeGuide} className="text-sm text-brand-primary hover:underline">Size Guide</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {allSizes.map(size => (
                             <button key={size} onClick={() => handleSizeChange(size)} className={`px-4 py-2 border rounded-md text-sm transition-colors ${filters.sizes.includes(size) ? 'bg-brand-primary text-brand-dark border-brand-primary' : 'bg-gray-800 border-gray-700 text-white hover:border-brand-primary'}`}>
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Colors */}
                 <div>
                    <h3 className="font-semibold text-white mb-3">Color</h3>
                    <div className="flex flex-wrap gap-3">
                         {allColors.map(color => (
                            <button key={color} onClick={() => handleColorChange(color)} className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 ${filters.colors.includes(color) ? 'border-brand-primary scale-110' : 'border-transparent'}`} style={{ backgroundColor: color }} aria-label={color} />
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h3 className="font-semibold text-white mb-3">Price Range</h3>
                    <div className="space-y-2">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={filters.priceRange[1]}
                            onChange={handlePriceChange}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"
                        />
                         <div className="flex justify-between text-sm text-brand-gray">
                            <span>$0</span>
                            <span>${filters.priceRange[1]}</span>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
};
