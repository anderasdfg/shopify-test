import { shopifyFetch } from '@/lib/shopify';
import { PRODUCTS_QUERY } from '@/lib/queries';
import { ProductConnection, HeroSlide } from '@/types/product';
import { mockProducts } from '@/mocks/products';

export async function getProducts(cursor?: string) {
    const variables = { first: 12, after: cursor || null };

    const { data } = await shopifyFetch<{ products: ProductConnection }>({
        query: PRODUCTS_QUERY,
        variables,
    });
    data.products.edges.push(...mockProducts.map(product => ({ node: product })));
    return data.products;
}

export async function getHeroSlidesFromProducts(): Promise<HeroSlide[]> {
    const products = await getProducts();

    return products.edges
        .slice(0, 3)
        .map(({ node: product }) => {
            const imageUrl = product.featuredImage?.url ||
                (product.images.edges[0]?.node.url || '');

            return {
                id: product.id,
                title: product.title,
                subtitle: product.description.substring(0, 120) + (product.description.length > 120 ? '...' : ''),
                imageUrl
            };
        });
} 