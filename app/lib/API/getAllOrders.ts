/* eslint-disable @typescript-eslint/no-explicit-any */

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllOrders = async (page = 1, limit = 10) => {
  const res = await fetch(
    `${baseUrl}/orders/all?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );

  console.log("Status:", res.status);

  if (!res.ok) {
    const error = await res.text();
    console.log("hello", error);

    throw new Error(`Failed to fetch order items: ${res.status}`);
  }

  return res.json();
};