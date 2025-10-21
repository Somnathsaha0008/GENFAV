export enum Category {
    T_SHIRTS = 'T-Shirts',
}

export enum Size {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL',
}

export interface Review {
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Product {
    id: number;
    name: string;
    category: Category;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    rating: number;
    reviewCount: number;
    sizes: Size[];
    colors: string[];
    description: string;
    isNew?: boolean;
    reviews: Review[];
}

export interface Filters {
    categories: Category[];
    sizes: Size[];
    colors: string[];
    priceRange: [number, number];
    sort: 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface CartItem extends Product {
    quantity: number;
    selectedSize: Size;
    selectedColor: string;
}