
import React from 'react';
import type { CartItem } from '../types';
import { ICONS } from '../constants';
import { Button } from './Button';

interface CartModalProps {
    cartItems: CartItem[];
    onClose: () => void;
    onUpdateQuantity: (productId: number, newQuantity: number) => void;
    onRemoveFromCart: (productId: number) => void;
}

export const CartModal: React.FC<CartModalProps> = ({ cartItems, onClose, onUpdateQuantity, onRemoveFromCart }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end animate-slide-in-right" onClick={onClose}>
            <div className="relative bg-gray-900 w-full max-w-md h-full flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-white">Your Bag ({cartItems.length})</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        {ICONS.close}
                    </button>
                </div>
                
                {/* Items */}
                {cartItems.length > 0 ? (
                    <>
                        <div className="flex-1 overflow-y-auto p-6">
                            <ul className="space-y-4">
                                {cartItems.map(item => (
                                    <li key={item.id} className="flex items-center space-x-4">
                                        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white">{item.name}</h3>
                                            <p className="text-sm text-gray-400">Size: {item.selectedSize} / Color: <span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: item.selectedColor}}></span></p>
                                            <p className="font-bold text-white mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="w-6 h-6 border border-gray-600 rounded-md text-gray-400 disabled:opacity-50">-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 border border-gray-600 rounded-md text-gray-400">+</button>
                                            </div>
                                        </div>
                                        <button onClick={() => onRemoveFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors" aria-label="Remove from cart">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         {/* Footer */}
                        <div className="p-6 border-t border-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-white">Subtotal</span>
                                <span className="text-xl font-bold text-white">${subtotal.toFixed(2)}</span>
                            </div>
                            <Button variant="primary" className="w-full">Proceed to Checkout</Button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <div className="text-gray-500 mb-4">{ICONS.bag}</div>
                        <h3 className="text-xl font-semibold text-white">Your Bag is Empty</h3>
                        <p className="text-gray-400 mt-2">Looks like you haven't added anything to your bag yet.</p>
                        <Button variant="primary" onClick={onClose} className="mt-6">Start Shopping</Button>
                    </div>
                )}
            </div>
        </div>
    );
};
