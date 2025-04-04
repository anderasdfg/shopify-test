export const shopifyFetch = async <T>({
    query,
    variables,
}: {
    query: string;
    variables?: Record<string, unknown>;
}): Promise<{ data: T; errors?: Array<{ message: string }> }> => {
    const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}/graphql.json`;

    const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_TOKEN as string,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!result.ok) {
        throw new Error(`Error fetching from Shopify: ${result.statusText}`);
    }

    return await result.json();
}; 