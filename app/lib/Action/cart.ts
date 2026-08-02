/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const AddToCart = async(newCartItem: any) => {
const response = await fetch(`${backendUrl}/cart`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newCartItem), 
});

const result = await response.json();
if (!response.ok) {
    throw new Error(result.message || "Failed to add item to cart");
  }

  return result;

}