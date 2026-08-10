/* eslint-disable @typescript-eslint/no-explicit-any */
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getOrderItems = async (email: any) => {

  if (!email) {
    throw new Error("User email is required to fetch order items");
  }

  const res = await fetch(`${baseUrl}/orders?email=${email}`, {
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