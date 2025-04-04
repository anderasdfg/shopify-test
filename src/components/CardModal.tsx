'use client';

import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

interface CardModalProps {
    onClose: () => void;
}

const CardModal = ({ onClose }: CardModalProps) => {
    const [mounted, setMounted] = useState(false);
    const { items, updateQuantity, removeItem, getTotal } = useCart();

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBackdropClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const formatPrice = (amount: number, currencyCode: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
        }).format(amount);
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                    aria-label="Close cart"
                >
                    <X size={24} />
                </button>

                <h2 className="mb-6 text-2xl font-bold text-gray-900">Shopping Cart</h2>

                {items.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                    <>
                        <div className="max-h-[60vh] space-y-4 overflow-y-auto">
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex items-center gap-4 rounded-lg border p-4"
                                >
                                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                                        {item.product.featuredImage?.url ? (
                                            <Image
                                                src={item.product.featuredImage?.url || ''}
                                                alt={item.product.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-gray-100 object-cover">
                                                <span className="text-gray-400">No image available</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <h3 className="font-medium text-gray-900">{item.product.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            {formatPrice(parseFloat(item.product.priceRange.minVariantPrice.amount), item.product.priceRange.minVariantPrice.currencyCode)}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="min-w-[2rem] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={16} />
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="ml-auto rounded-full bg-gray-100 p-1 text-red-500 hover:bg-red-100"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 border-t pt-4">
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>{formatPrice(getTotal(), items[0].product.priceRange.minVariantPrice.currencyCode)}</span>
                            </div>
                            <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-medium text-white hover:bg-primary/80">
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    if (!mounted) return null;

    return createPortal(modalContent, document.body);
};

export default CardModal;