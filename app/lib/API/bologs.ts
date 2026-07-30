const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllBlogs = async () => {
  const res = await fetch(`${baseUrl}/blogs`, {
    cache: "force-cache",
  });

  console.log("Status:", res.status);

  if (!res.ok) {
    const error = await res.text();
    console.log("hello",error);
    throw new Error(`Failed to fetch blogs: ${res.status}`);
  }

  return res.json();
};