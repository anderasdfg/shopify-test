'use client';

import { ProductConnection } from '@/types/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { SECTION_TITLES } from '@/constants/messages';

import 'swiper/css';
import 'swiper/css/navigation';

interface FeaturedProductsProps {
    products: ProductConnection;
    title?: string;
}

const FeaturedProducts = ({ products, title = SECTION_TITLES.FEATURED_COLLECTION }: FeaturedProductsProps) => {
    const createProductGroups = () => {
        const groups = [];
        const totalProducts = products.edges.length;

        for (let i = 0; i < totalProducts; i += 8) {
            groups.push(products.edges.slice(i, i + 8));
        }

        return groups;
    };

    const productGroups = createProductGroups();

    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary">{title}</h2>

                {/* Mobile view */}
                <div className="md:hidden grid grid-cols-2 gap-4">
                    {products.edges.map(({ node: product }) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="hidden md:block relative">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.next-ref-grid-button',
                            prevEl: '.prev-ref-grid-button',
                        }}
                        loop={false}
                        className="w-full"
                    >
                        {productGroups.map((group, groupIndex) => (
                            <SwiperSlide key={`group-${groupIndex}`}>
                                <div className="grid grid-cols-4 gap-4">
                                    {group.map(({ node: product }) => (
                                        <div key={product.id}>
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                    {groupIndex === productGroups.length - 1 && group.length < 8 &&
                                        Array.from({ length: 8 - group.length }).map((_, emptyIndex) => (
                                            <div key={`empty-${emptyIndex}`} className="empty-slide"></div>
                                        ))
                                    }
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 z-10 flex space-x-4 pb-4">
                        <button
                            className="prev-ref-grid-button flex items-center justify-center w-10 h-10 rounded-full bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            className="next-ref-grid-button flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;