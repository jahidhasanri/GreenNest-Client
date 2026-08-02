/* eslint-disable @typescript-eslint/no-explicit-any */

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteCartItem = async (id: string) => {
  const res = await fetch(`${baseUrl}/cart/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to delete cart item");
  }

  return res.json();
};