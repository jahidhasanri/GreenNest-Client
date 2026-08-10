/* eslint-disable @typescript-eslint/no-explicit-any */

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const cancelOrderItem = async (id: string) => {
  const res = await fetch(`${baseUrl}/orders/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to cancel order item");
  }

  return res.json();
};