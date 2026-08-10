/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useSession } from "../../lib/auth-client";
import {  getOrderItems } from "../../lib/API/getOrder";
import { QueryClient, useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import Image from "next/image";
import { cancelOrderItem } from "@/app/lib/API/orderDelete";
import { toast } from "sonner";

const Page = () => {
  const { data: session, isPending: sessionPending } = useSession();
    const [cancelOrder, setCancelOrder] = useState<string | null>(null);

  const email = session?.user?.email || "";

  const queryClient = useQueryClient();

  // Get Orders
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", email],
    queryFn: () => getOrderItems(email),
    enabled: !!email,
  });

  // Cancel Order Mutation
  const cancelMutation = useMutation({
    mutationFn: (orderId: string) => cancelOrderItem(orderId),

   onSuccess: () => {
  setCancelOrder(null);

  queryClient.invalidateQueries({
    queryKey: ["orders", email],
  });

  toast.success("Order cancelled successfully");
},
    onError: (error) => {
      toast.error(`Cancel failed ${error}`);
    },
  });

  //Session loading
  if (sessionPending) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  // User not logged in
  if (!email) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            Please login
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Login to see your orders.
          </p>
        </div>
      </div>
    );
  }

  // Orders loading
  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

          <p className="mt-3 text-sm text-gray-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load orders"}
        </p>
      </div>
    );
  }

  // No orders
  if (!orders || orders.length === 0) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No Orders Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f7] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your recent orders
          </p>
        </div>

        {/* Orders */}
        <div className="space-y-6">
          {orders.map((order: any) => {
            const isPending = order.status === "pending";
            const isConfirmed = order.status === "confirmed";
            const isCancelled = order.status === "cancelled";

            return (
              <div
                key={order._id}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >
                {/* Order Header */}
                <div className="border-b border-gray-100 p-4 sm:p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Order Info */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap sm:gap-8">
                      <div>
                        <p className="text-[11px] text-gray-400">
                          Order ID
                        </p>

                        <p className="mt-1 text-xs font-medium text-gray-700">
                          #{order._id.slice(-8)}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] text-gray-400">
                          Date
                        </p>

                        <p className="mt-1 text-xs font-medium text-gray-700">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] text-gray-400">
                          Items
                        </p>

                        <p className="mt-1 text-xs font-medium text-gray-700">
                          {order.items.length}{" "}
                          {order.items.length === 1
                            ? "item"
                            : "items"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] text-gray-400">
                          Total
                        </p>

                        <p className="mt-1 text-xs font-semibold text-gray-900">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
                          isPending
                            ? "bg-yellow-50 text-yellow-600"
                            : isConfirmed
                            ? "bg-green-50 text-green-600"
                            : isCancelled
                            ? "bg-red-50 text-red-500"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-175">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                        <th className="px-5 py-3 text-[11px] font-medium text-gray-400">
                          Product
                        </th>

                        <th className="px-5 py-3 text-[11px] font-medium text-gray-400">
                          Price
                        </th>

                        <th className="px-5 py-3 text-[11px] font-medium text-gray-400">
                          Quantity
                        </th>

                        <th className="px-5 py-3 text-right text-[11px] font-medium text-gray-400">
                          Subtotal
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.items.map(
                        (item: any, index: number) => (
                          <tr
                            key={`${item.productId}-${index}`}
                            className="border-b border-gray-50 last:border-0"
                          >
                            {/* Product */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={56}
                                    height={56}
                                    className="h-full w-full object-cover"
                                  />
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-gray-800">
                                    {item.name}
                                  </p>

                                  <p className="mt-1 text-[10px] text-gray-400">
                                    Product ID:{" "}
                                    {item.productId.slice(-6)}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="px-5 py-4 text-sm text-gray-600">
                              ${item.price.toFixed(2)}
                            </td>

                            {/* Quantity */}
                            <td className="px-5 py-4 text-sm text-gray-600">
                              {item.quantity}
                            </td>

                            {/* Subtotal */}
                            <td className="px-5 py-4 text-right text-sm font-medium text-gray-800">
                              $
                              {(
                                item.price * item.quantity
                              ).toFixed(2)}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Order Footer */}
                <div className="flex flex-col gap-4 border-t border-gray-100 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
                  {/* Shipping */}
                  <div>
                    <p className="text-[11px] text-gray-400">
                      Shipping to
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      {order.shippingInfo.fullName},{" "}
                      {order.shippingInfo.city},{" "}
                      {order.shippingInfo.address}
                    </p>
                  </div>

                  {/* Total + Cancel */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="text-left sm:text-right">
                      <p className="text-[11px] text-gray-400">
                        Order Total
                      </p>

                      <p className="text-lg font-bold text-gray-900">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={
                        !isPending ||
                        cancelMutation.isPending
                      }
                      onClick={() => {
  setCancelOrder(order._id);
}}
                      className={`rounded-lg px-5 py-2.5 text-xs font-semibold transition ${
                        isPending
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "cursor-not-allowed bg-gray-100 text-gray-400"
                      }`}
                    >
                      {cancelMutation.isPending &&
                      cancelMutation.variables ===
                        order._id
                        ? "Cancelling..."
                        : "Cancel Order"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Cancel Confirmation Modal */}
{cancelOrder && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
      {/* Icon */}
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-6 w-6 text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M10.3 3.5 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.5a2 2 0 0 0-3.4 0Z"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-center text-lg font-semibold text-gray-900">
        Cancel Order?
      </h2>

      {/* Description */}
      <p className="mt-2 text-center text-sm leading-6 text-gray-500">
        Are you sure you want to cancel this order?
        This action cannot be undone.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        {/* No */}
        <button
          type="button"
          onClick={() => {
            setCancelOrder(null);
          }}
          disabled={cancelMutation.isPending}
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          No, Keep Order
        </button>

        {/* Yes */}
        <button
          type="button"
          onClick={() => {
            if (cancelOrder) {
              cancelMutation.mutate(cancelOrder);
            }
          }}
          disabled={cancelMutation.isPending}
          className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cancelMutation.isPending
            ? "Cancelling..."
            : "Yes, Cancel"}
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  );
};

export default Page;