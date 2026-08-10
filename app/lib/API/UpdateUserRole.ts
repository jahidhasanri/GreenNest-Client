const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateUserRole = async (id: string, role: "admin" | "user") => {
  const res = await fetch(`${baseUrl}/users/${id}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to update role: ${error || res.status}`);
  }

  return res.json();
};