import React, { useState } from 'react';
import type { Product, Review } from '../types';
import { ICONS } from '../constants';
import { Button } from './Button';

interface WriteReviewModalProps {
    product: Product;
    onClose: () => void;
    onSubmit: (productId: number, review: Omit<Review, 'id' | 'date'>) => void;
}

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return (
        <div className="flex items-center space-x-1" onMouseLeave={() => setHoverRating(0)}>
            {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                    <button
                        type="button"
                        key={i}
                        className={`transition-colors text-3xl ${starValue <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        aria-label={`Rate ${starValue} stars`}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};


export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ product, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a star rating.');
            return;
        }
        if (!author.trim()) {
            setError('Please enter your name.');
            return;
        }
        if (!comment.trim()) {
            setError('Please write a comment.');
            return;
        }
        setError(null);
        onSubmit(product.id, { author, rating, comment });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="relative bg-gray-900 w-full max-w-lg rounded-lg overflow-hidden p-8" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
                    {ICONS.close}
                </button>

                <h3 className="text-2xl font-bold text-white mb-2">Write a Review</h3>
                <p className="text-brand-gray mb-6">for {product.name}</p>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-light mb-2">Your Rating</label>
                            <StarRatingInput rating={rating} setRating={setRating} />
                        </div>
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-brand-light mb-2">Your Name</label>
                            <input
                                type="text"
                                id="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary font-sans"
                                placeholder="e.g. Alex R."
                            />
                        </div>
                        <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-brand-light mb-2">Your Review</label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary font-sans"
                                placeholder="What did you like or dislike?"
                            />
                        </div>
                    </div>
                    
                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

                    <div className="mt-8">
                        <Button type="submit" variant="primary" className="w-full">
                            Submit Review
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};