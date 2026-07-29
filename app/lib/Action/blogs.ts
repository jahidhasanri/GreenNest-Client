/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createBlog = async(newBlog: any) => {
const response = await fetch(`${backendUrl}/blogs`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newBlog), 
});

const result = await response.json();
if (!response.ok) {
    throw new Error(result.message || "Failed to post blog");
  }

  return result;

}