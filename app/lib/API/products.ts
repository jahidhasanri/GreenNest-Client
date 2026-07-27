console.time("getProducts");
interface GetAllProductsParams {
  search?: string;
  sort?: string;
  page?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllProducts = async ({
  search = "",
  sort = "",
  page = "1",
}: GetAllProductsParams) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (sort) params.set("sort", sort);

  params.set("page", page);
  params.set("limit", "8");

  const res = await fetch(
    `${baseUrl}/api/products?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};