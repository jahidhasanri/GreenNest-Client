

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteUser= async(id:string)=>{
    const res =  await fetch(`${baseUrl}/users/${id}`, {
        method: "DELETE",
      });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(error || "Failed to delete user");
        }
        return res.json();
}




