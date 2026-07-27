/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createProduct = async(newProduct: any) => {
const response = await fetch(`${backendUrl}/products`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newProduct), 
});

const result = await response.json();
if (!response.ok) {
    throw new Error(result.message || "Failed to create product");
  }

  return result;

}