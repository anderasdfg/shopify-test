'use client';

import Image from 'next/image';
import { HeroSlide } from '@/types/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BUTTON_LABELS } from '@/constants/messages';
import { BACKGROUNDS, getAssetPath } from '@/assets/index';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroSliderProps {
    slides: HeroSlide[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {

    return (
        <div className="relative w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="w-full h-[680px] md:h-[600px]"
                navigation={{
                    nextEl: '.next-ref-button',
                    prevEl: '.prev-ref-button',
                }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0">
                                <Image
                                    src={getAssetPath(BACKGROUNDS.sliderBackground)}
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div className="relative z-10 h-full container mx-auto md:px-4 px-1 flex flex-col items-center justify-center">
                                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
                                    {/* Mobile layout */}
                                    <div className="w-full md:hidden flex justify-center py-1 md:py-4">
                                        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-[280px] h-[320px]">
                                            <Image
                                                src={slide.imageUrl}
                                                alt={slide.title}
                                                fill
                                                className="object-fit"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/2 text-center md:text-left">
                                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary mb-3">
                                            {slide.title}
                                        </h1>
                                        <p className="text-sm text-primary mb-6">
                                            {slide.subtitle}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center md:justify-start sm:mb-4">
                                            <button className="bg-primary text-white py-3 px-6 uppercase font-medium hover:bg-primary-dark transition-colors rounded-md flex items-center justify-center  md:w-1/2 w-[200px]">
                                                {BUTTON_LABELS.SHOP_NOW}
                                                <ChevronRight size={16} className="ml-1" />
                                            </button>
                                            <button className="border border-primary text-primary py-3 px-6 uppercase font-medium hover:bg-primary/5 transition-colors rounded-md md:flex items-center justify-center hidden md:w-1/2">
                                                {BUTTON_LABELS.TAKE_QUIZ}
                                                <ChevronRight size={16} className="ml-1" />
                                            </button>
                                            <a
                                                href="#"
                                                className="text-primary uppercase font-medium hover:underline text-center md:hidden"
                                            >
                                                {BUTTON_LABELS.TAKE_QUIZ}
                                            </a>
                                        </div>
                                        <div className="flex flex-row gap-4 justify-center md:justify-start pt-8 mb-4">
                                            <button
                                                className="prev-ref-button flex items-center justify-center w-10 h-10 rounded-full bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                                                aria-label="Previous slide"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <button
                                                className="next-ref-button flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                                                aria-label="Next slide"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end py-6 md:py-0">
                                        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-[280px] h-[320px] md:w-[450px] md:h-[500px]">
                                            <Image
                                                src={slide.imageUrl}
                                                alt={slide.title}
                                                fill
                                                className="object-fit"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
};

export default HeroSlider;