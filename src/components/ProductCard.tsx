'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { BUTTON_LABELS } from '@/constants/messages';
import CardModal from './CardModal';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addItem } = useCart();
    const price = product.priceRange.minVariantPrice;
    const imageUrl = product.featuredImage?.url || (product.images.edges[0]?.node.url || '');

    const formatPrice = (amount: string, currencyCode: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
        }).format(parseFloat(amount));
    };

    const handleAddToCart = () => {
        addItem(product);
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <CardModal onClose={() => setIsModalOpen(false)} />}
            <div className="group relative mx-auto h-[400px] max-w-[300px] overflow-hidden rounded-xl bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 ease-in-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] mb-5">
                <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                            priority={false}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100">
                            <span className="text-gray-400">No image available</span>
                        </div>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-white p-4">
                    <h3 className="mb-2 text-sm font-medium text-gray-900 line-clamp-2">{product.title}</h3>
                    <div className="flex items-center justify-between md:flex-row flex-col gap-2">
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                            {formatPrice(price.amount, price.currencyCode)}
                        </p>
                        <button
                            onClick={handleAddToCart}
                            className="rounded bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80 md:w-1/2 w-full"
                            aria-label={`Buy ${product.title}`}
                        >
                            {BUTTON_LABELS.BUY_NOW}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard; 