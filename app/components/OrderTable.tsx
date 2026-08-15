/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface OrderItem {
  productId: string;
  fullName: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  shippingInfo: {
    fullName?: string;
    address?: string;
    phone?: string;
  };
  totalAmount: number;
  status: string;
  userEmail: string;
  createdAt: string;
}

interface OrderTableProps {
  orders: Order[];
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const OrderTable = ({
  orders,
  totalOrders,
  currentPage,
  totalPages,
  onPageChange,
}: OrderTableProps) => {
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  const updateOrderStatus = async (
    orderId: string,
    status: "confirmed" | "cancelled" | "delivered",
  ) => {
    try {
      setLoadingId(orderId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order");
      }

      setOrderList((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: data?.order?.status || status,
              }
            : order,
        ),
      );

      if (status === "confirmed") {
        toast.success("Order confirmed successfully!");
      } else if (status === "cancelled") {
        toast.success("Order cancelled successfully!");
      } else if (status === "delivered") {
        toast.success("Order marked as delivered!");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update order status",
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      {/* Order Table */}
      <div className="overflow-x-auto rounded-lg border bg-white text-black">
        <table className="w-full min-w-250 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-4">Order ID</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Products</th>
              <th className="px-4 py-4">Total</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orderList.map((order) => (
              <tr key={order._id} className="border-t align-top">
                {/* Order ID */}
                <td className="px-4 py-4">
                  <p className="max-w-30 truncate text-sm">{order._id}</p>
                </td>

                {/* Customer */}
                <td className="px-4 py-4">
                  <p className="font-medium">
                    {order.shippingInfo?.fullName || "N/A"}
                  </p>

                  <p className="text-sm text-gray-500">{order.userEmail}</p>

                  <p className="text-sm text-gray-500">
                    {order.shippingInfo?.phone || "N/A"}
                  </p>
                </td>

                {/* Products */}
                <td className="px-4 py-4">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={`${item.productId}-${index}`}
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-14 w-14 overflow-hidden rounded-md border">
                          <Image
                            src={item.image}
                            alt={item.fullName || "Product image"}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-medium">{item.fullName}</p>

                          <p className="text-sm text-gray-500">
                            ${item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Total */}
                <td className="px-4 py-4 font-semibold">
                  ${order.totalAmount}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "delivered"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-4 py-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="px-4 py-4">
                  {/* Pending */}
                  {order.status === "pending" && (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() =>
                          updateOrderStatus(order._id, "confirmed")
                        }
                        disabled={loadingId === order._id}
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loadingId === order._id
                          ? "Updating..."
                          : "Confirm Order"}
                      </button>

                      <button
                        onClick={() =>
                          updateOrderStatus(order._id, "cancelled")
                        }
                        disabled={loadingId === order._id}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loadingId === order._id
                          ? "Updating..."
                          : "Cancel Order"}
                      </button>
                    </div>
                  )}

                  {/* Confirmed */}
                  {order.status === "confirmed" && (
                    <button
                      onClick={() =>
                        updateOrderStatus(order._id, "delivered")
                      }
                      disabled={loadingId === order._id}
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loadingId === order._id
                        ? "Updating..."
                        : "Delivered"}
                    </button>
                  )}

                  {/* Cancelled / Delivered */}
                  {(order.status === "cancelled" ||
                    order.status === "delivered") && (
                    <span className="text-sm text-gray-400">
                      No action
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orderList.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No orders found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * 10 + 1}–
            {Math.min(currentPage * 10, totalOrders)} of {totalOrders} orders
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`h-9 w-9 rounded-md text-sm font-medium ${
                    currentPage === page
                      ? "bg-green-600 text-white"
                      : "border bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;