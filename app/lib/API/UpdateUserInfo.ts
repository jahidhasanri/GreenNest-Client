const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const updateUserInformation = async (
  userId: string,
  name: string,
  image: string | null
) => {
  const res = await fetch(`${baseUrl}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      image,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message || "Failed to update profile"
    );
  }

  return data;
};