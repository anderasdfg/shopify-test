import { Product } from '@/types/product';

const mockImages = [
    'https://cdn.shopify.com/s/files/1/0563/6744/8255/files/ripple-peach1-primary_1200x_1_219a421f-9e2d-4d98-a04a-1a71d7cf045d.webp?v=1700958615',
];

export const mockProducts: Product[] = Array.from({ length: 7 }).map((_, index) => ({
    id: `mock-product-${index + 1}`,
    title: `Test Product ${index + 1}`,
    description: `Description for test product ${index + 1}`,
    handle: `test-product-${index + 1}`,
    priceRange: {
        minVariantPrice: {
            amount: ((index + 1) * 99.99).toString(),
            currencyCode: 'USD',
        },
        maxVariantPrice: {
            amount: ((index + 1) * 99.99).toString(),
            currencyCode: 'USD',
        },
    },
    featuredImage: {
        id: `gid://shopify/ProductImage/mock-${index + 1}`,
        url: mockImages[0],
        altText: `Test Product ${index + 1}`,
        width: 960,
        height: 960
    },
    images: {
        edges: [],
    },
})); 