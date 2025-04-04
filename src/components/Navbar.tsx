'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { PROMO_MESSAGES, NAV_LABELS, CATEGORIES } from '@/constants/messages';
import { useCart } from '@/context/CartContext';
import CardModal from './CardModal';
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { getUniqueItemsCount } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const isActive = (href: string) => {
        return pathname === href;
    };

    const handleAddToCart = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <CardModal onClose={() => setIsModalOpen(false)} />}
            <div className="w-full">
                <div className="w-full bg-primary text-white text-center py-2 text-xs">
                    {PROMO_MESSAGES.BANNER}
                </div>

                <nav className="flex justify-between items-center px-4 py-4 bg-white shadow-sm relative">
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-800"
                            aria-label={isMenuOpen ? NAV_LABELS.CLOSE : NAV_LABELS.MENU}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    <div className="hidden md:flex justify-center absolute left-0 right-0">
                        <div className="flex space-x-8">
                            {CATEGORIES.map((category) => (
                                <Link
                                    key={category.id}
                                    href={category.href}
                                    className={`
                                    uppercase text-sm font-medium relative group
                                    ${isActive(category.href) ? 'text-primary' : 'text-gray-800 hover:text-primary'}
                                `}
                                >
                                    {category.title}
                                    <span
                                        className={`
                                        absolute bottom-0 top-5 left-0 w-full h-1 bg-primary transition-transform duration-300 ease-in-out
                                        ${isActive(category.href) ? 'transform scale-x-100' : 'transform scale-x-0 group-hover:scale-x-100'}
                                    `}
                                    ></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Shopping cart  */}
                    <div className="ml-auto">
                        <button className="relative hover:cursor-pointer" aria-label={NAV_LABELS.CART} onClick={() => handleAddToCart()}>
                            <ShoppingBag className="h-5 w-5 text-gray-800" />
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {getUniqueItemsCount()}
                            </span>
                        </button>
                    </div>
                </nav>

                {/* Mobile menu overlay */}
                <div
                    className={`
                    fixed inset-0 z-50 bg-white transition-all duration-300 ease-in-out
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <div className="text-lg font-medium">Menu</div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            aria-label={NAV_LABELS.CLOSE}
                        >
                            <X className="h-6 w-6 text-gray-800" />
                        </button>
                    </div>

                    {/* Menu items  */}
                    <div className="p-4 flex flex-col space-y-4 overflow-y-auto flex-1">
                        {CATEGORIES.map((category, index) => (
                            <Link
                                key={category.id}
                                href={category.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                py-2 text-lg border-b border-gray-100 relative group
                                transform transition-all duration-300 ease-in-out
                                ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                                ${isActive(category.href) ? 'text-primary' : 'text-gray-800 hover:text-primary'}
                            `}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {category.title}
                                <span
                                    className={`
                                    absolute bottom-0 left-0 w-full h-1 bg-primary transition-transform duration-300 ease-in-out
                                    ${isActive(category.href) ? 'transform scale-x-100' : 'transform scale-x-0 group-hover:scale-x-100'}
                                `}
                                ></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;