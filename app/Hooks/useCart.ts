import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../lib/API/cart";


export const useCart = (email: string) => {
  return useQuery({
    queryKey: ["cart", email], // eita unique key, email change hole notun call hobe
    queryFn: () => getCartItems(email),
    enabled: !!email, // email na thakle call e hobe na
  });
};