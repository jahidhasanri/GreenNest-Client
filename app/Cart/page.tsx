/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Trash2, Minus, Plus } from "lucide-react";
import S_Banner from "../components/SharedBanner/S_Banner";
import { useCart } from "../Hooks/useCart";
import { useSession } from "../lib/auth-client";
import Image from "next/image";
import { deleteCartItem } from "../lib/API/cartDelete";
import { toast } from "sonner";
import { updateCartQuantity } from "../lib/API/cartUpdate";


type ShippingInfo = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  note: string;
};

const Page = () => {
  // ✅ shob hook age, kono if/return er age
  const { data: session, isPending } = useSession();
  const email = session?.user?.email;
  const { data: cartItems, isLoading, isError } = useCart(email || "");
  const queryClient = useQueryClient();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    note: "",
  });

  // ✅ Delete confirmation modal er jonno state
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteCartItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", email] });
      toast.success("Cart item removed successfully!");
    },
    onError: (error) => {
      toast.error(
        `Failed to remove cart item. ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });

  // ✅ Delete button e click korle modal open hobe, sathe sathe delete hobe na
  const handleRemoveClick = (id: string) => {
    setItemToDelete(id);
  };

  // ✅ Modal e "Yes" click korle actual delete hobe
  const confirmDelete = () => {
    if (itemToDelete) {
      removeItemMutation.mutate(itemToDelete);
      setItemToDelete(null);
    }
  };

  // ✅ Modal e "No" click korle modal bondho hoye jabe, kichu hobe na
  const cancelDelete = () => {
    setItemToDelete(null);
  };


// Quantity update mutation
const updateQuantityMutation = useMutation({
  mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
    return await updateCartQuantity(id, quantity);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["cart", email] });
  },
  onError: (error) => {
    toast.error(
      `Quantity update failed. ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  },
});




  const handleQuantityChange = (
  id: string,
  currentQty: number,
  availableQty: number,
  type: "inc" | "dec"
) => {
  if (type === "inc") {
    // ✅ available stock er beshi barano jabe na
    if (currentQty >= availableQty) {
      toast.error(`Only ${availableQty} item(s) available in stock`);
      return;
    }
    updateQuantityMutation.mutate({ id, quantity: currentQty + 1 });
  } else {
    // ✅ minimum 1 ta thakbei
    if (currentQty <= 1) {
      toast.error("Minimum quantity is 1");
      return;
    }
    updateQuantityMutation.mutate({ id, quantity: currentQty - 1 });
  }
};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Shipping Info:", shippingInfo);
    console.log("Cart Items:", cartItems);
    // eikhane order placement API call add korte paro
  };

  // ✅ conditional return gula ekhon hoy, hook er por
  if (isPending) return <div>Loading...</div>;
  if (!email) return <div>Cart dekhte hole login korte hobe</div>;
  if (isLoading) return <div>Cart loading hocche...</div>;
  if (isError) return <div>Cart items load korte problem hoyeche</div>;
  if (!cartItems || cartItems.length === 0) return <div>Your cart is empty</div>;

  const totalAmount = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white">
      <S_Banner title="Cart" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Cart Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg text-black">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Menu Image</th>
                <th className="px-6 py-4 font-semibold">Menu Name</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Quantity</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any) => (
                <tr key={item._id} className="border-t border-gray-100">
                  <td className="px-6 py-4">
                    <Image
                      width={56}
                      height={56}
                      src={item?.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.quantity,
                            item.availableQuantity,
                            "dec"
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center border rounded disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.quantity,
                            item.availableQuantity,
                            "inc"
                          )
                        }
                        disabled={item.quantity >= item.availableQuantity}
                        className="w-7 h-7 flex items-center justify-center border rounded disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRemoveClick(item._id)}
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="text-center mt-6 text-black font-bold text-lg">
          Total Amount: ${totalAmount.toFixed(2)}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="px-6 py-2 text-black border border-gray-300 rounded hover:bg-gray-50">
            Continue Shopping
          </button>
        </div>

        {/* Shipping Address Form */}
        <div className="mt-14 max-w-2xl mx-auto border text-black border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

          <form
            onSubmit={handleCheckout}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-sm font-medium">Street Address</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">City</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">ZIP / Postal Code</label>
              <input
                type="text"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-sm font-medium">
                Delivery Note (optional)
              </label>
              <textarea
                name="note"
                value={shippingInfo.note}
                onChange={handleInputChange}
                rows={3}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 shadow-lg">
            <h3 className="text-lg font-bold text-black mb-2">
              Remove Item
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this item from your cart?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded text-black hover:bg-gray-50"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;