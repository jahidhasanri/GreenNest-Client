const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getProducts = async () => {
    const response = await fetch(`${baseUrl}/products`);
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch products");
    }
    return result;
}