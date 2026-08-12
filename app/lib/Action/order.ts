/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const AddFinalOrder = async (cartItems: any, shippingInfo: any, email: string) => {
  const response = await fetch(`${backendUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItems, shippingInfo, email }), // ✅ dutai ekta object e pathao
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to place order");
  }

  return result;
};