/* eslint-disable @typescript-eslint/no-explicit-any */
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllOrders = async () => {

  const res = await fetch(`${baseUrl}/orders/all`, {
    cache: "no-store", 
  });

  console.log("Status:", res.status);

  if (!res.ok) {
    const error = await res.text();
    console.log("hello", error);
    throw new Error(`Failed to fetch order items: ${res.status}`);
  }

  return res.json();
};