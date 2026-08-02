const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateCartQuantity = async (id: string, quantity: number) => {
  const res = await fetch(`${baseUrl}/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to update quantity: ${error || res.status}`);
  }

  return res.json();
};