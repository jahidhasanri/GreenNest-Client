/* eslint-disable @typescript-eslint/no-explicit-any */
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUsers = async () => {


  const res = await fetch(`${baseUrl}/users`, {
    cache: "no-store", 
  });


  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  return res.json();
};