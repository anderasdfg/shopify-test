export interface Money {
    amount: string;
    currencyCode: string;
}

export interface Image {
    id: string;
    url: string;
    altText?: string;
    width: number;
    height: number;
}

export interface Product {
    id: string;
    title: string;
    handle: string;
    description: string;
    priceRange: {
        minVariantPrice: Money;
        maxVariantPrice: Money;
    };
    featuredImage?: Image;
    images: {
        edges: Array<{
            node: Image;
        }>;
    };
}

export interface ProductsResponse {
    products: {
        edges: Array<{
            node: Product;
        }>;
        pageInfo: {
            hasNextPage: boolean;
            endCursor: string;
        };
    };
} 