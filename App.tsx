
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { FilterSidebar } from './components/FilterSidebar';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { CartModal } from './components/CartModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { MOCK_PRODUCTS } from './constants';
import type { Product, Filters, Size, CartItem, Review, Category } from './types';

function App() {
  // State management
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 100],
    sort: 'newest',
  });
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Effect to apply filters and sorting whenever products or filters change
  useEffect(() => {
    let tempProducts = [...products];

    // Filtering
    if (filters.categories.length > 0) {
      tempProducts = tempProducts.filter(p => filters.categories.includes(p.category));
    }
    if (filters.sizes.length > 0) {
      tempProducts = tempProducts.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
        tempProducts = tempProducts.filter(p => p.colors.some(c => filters.colors.includes(c)));
    }
    tempProducts = tempProducts.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    // Sorting
    switch (filters.sort) {
      case 'price-asc':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        tempProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Assuming higher ID is newer
        tempProducts.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredProducts(tempProducts);
  }, [filters, products]);
  
  // Handlers
  const handleToggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product, size: Size, color: string) => {
    setCart(prev => {
        const existingItem = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
        if (existingItem) {
            return prev.map(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };
  
  const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
    const itemInCart = cart.find(item => item.id === productId);
    if (!itemInCart) return;

    if (newQuantity < 1) {
        handleRemoveFromCart(productId, itemInCart.selectedSize, itemInCart.selectedColor);
        return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveFromCart = (productId: number, size: Size, color: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)));
  };
  
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal('productDetail');
  };

  const handleSubmitReview = (productId: number, review: Omit<Review, 'id' | 'date'>) => {
    setProducts(prevProducts => prevProducts.map(p => {
        if (p.id === productId) {
            const newReview: Review = {
                ...review,
                id: p.reviews.length + 1,
                date: new Date().toISOString().split('T')[0],
            };
            return {
                ...p,
                reviews: [newReview, ...p.reviews],
                reviewCount: p.reviewCount + 1,
                // A more accurate rating would average the new rating in.
                // rating: (p.rating * p.reviewCount + newReview.rating) / (p.reviewCount + 1),
            };
        }
        return p;
    }));
    setActiveModal(null); // Close review modal
    // Also update selected product to show new review if detail modal is opened again
    setSelectedProduct(prev => prev && prev.id === productId ? products.find(p => p.id === productId) || null : prev);
  };
  
  const handleWriteReview = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal('writeReview');
  };
  
  const allCategories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category))) as Category[];
  const allSizes = Array.from(new Set(MOCK_PRODUCTS.flatMap(p => p.sizes))) as Size[];
  const allColors = Array.from(new Set(MOCK_PRODUCTS.flatMap(p => p.colors)));

  return (
    <div className="bg-brand-dark min-h-screen font-sans text-brand-light">
      <Header 
        wishlistCount={wishlist.length}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onSearchClick={() => setActiveModal('search')}
        onWishlistClick={() => setActiveModal('wishlist')}
        onCartClick={() => setActiveModal('cart')}
      />
      
      <Hero />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar 
                filters={filters}
                onFiltersChange={setFilters}
                allCategories={allCategories}
                allSizes={allSizes}
                allColors={allColors}
                onOpenSizeGuide={() => setActiveModal('sizeGuide')}
            />
            <ProductGrid 
                products={filteredProducts}
                onViewDetails={handleViewDetails}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
            />
        </div>
      </main>

      <Footer />
      
      {/* Modals */}
      {activeModal === 'productDetail' && selectedProduct && (
        <ProductDetailModal 
            product={products.find(p => p.id === selectedProduct.id) || selectedProduct}
            onClose={() => setActiveModal(null)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onWriteReview={handleWriteReview}
        />
      )}
      {activeModal === 'search' && (
        <SearchModal 
            allProducts={products}
            onClose={() => setActiveModal(null)}
            onViewDetails={handleViewDetails}
        />
      )}
       {activeModal === 'wishlist' && (
        <WishlistModal 
            wishlistItems={products.filter(p => wishlist.includes(p.id))}
            onClose={() => setActiveModal(null)}
            onViewDetails={handleViewDetails}
            onRemoveFromWishlist={handleToggleWishlist}
        />
      )}
      {activeModal === 'cart' && (
        <CartModal
            cartItems={cart}
            onClose={() => setActiveModal(null)}
            onUpdateQuantity={(productId, newQuantity) => {
                const item = cart.find(i => i.id === productId);
                if (item) {
                  handleUpdateCartQuantity(productId, newQuantity)
                }
            }}
            onRemoveFromCart={(productId) => {
                const item = cart.find(i => i.id === productId);
                if (item) {
                  handleRemoveFromCart(productId, item.selectedSize, item.selectedColor);
                }
            }}
        />
      )}
       {activeModal === 'writeReview' && selectedProduct && (
        <WriteReviewModal
            product={selectedProduct}
            onClose={() => setActiveModal(null)}
            onSubmit={handleSubmitReview}
        />
      )}
      {activeModal === 'sizeGuide' && (
        <SizeGuideModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}

export default App;
