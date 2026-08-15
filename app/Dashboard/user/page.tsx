/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
  ShoppingCart,
  UserRound,
  ArrowRight,
  Package,
  Leaf,
  CreditCard,
} from "lucide-react";

import { useSession } from "@/app/lib/auth-client";
import { useCart } from "@/app/Hooks/useCart";
import { getOrderItems } from "../../lib/API/getOrder";

import { useQuery } from "@tanstack/react-query";

const UserDashboard = () => {
  // =========================================================
  // SESSION
  // =========================================================

  const { data: session, isPending: sessionLoading } = useSession();

  const user = session?.user;

  const email = user?.email || "";

  // =========================================================
  // CART
  // =========================================================

  const {
    data: cartItems,
    isLoading: cartLoading,
  } = useCart(email);

  const cartCount = cartItems?.length || 0;

  // =========================================================
  // ORDERS
  // =========================================================

  const {
    data: orderResponse,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useQuery({
    queryKey: ["orders", email],

    queryFn: () => getOrderItems(email),

    enabled: !!email,
  });


  const orders = Array.isArray(orderResponse)
    ? orderResponse
    : orderResponse?.orders || [];

  // =========================================================
  // ORDER STATISTICS
  // =========================================================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order: any) =>
      order.status?.toLowerCase() === "pending"
  ).length;

  const processingOrders = orders.filter(
    (order: any) =>
      ["confirmed", "processing"].includes(
        order.status?.toLowerCase()
      )
  ).length;


  const completedOrders = orders.filter(
    (order: any) =>
      ["delivered", "completed"].includes(
        order.status?.toLowerCase()
      )
  ).length;
  
  // =========================================================
  // TOTAL SPENT
  // =========================================================

  const totalSpent = orders.reduce(
    (sum: number, order: any) =>
      sum + Number(order.totalAmount || 0),
    0
  );

  // =========================================================
  // LOADING
  // =========================================================

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7F3]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-[#5a8139] border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // NO USER
  // =========================================================

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7F3]">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <UserRound
            size={40}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-lg font-semibold text-[#192C27]">
            Please login first
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            You need to login to access your dashboard.
          </p>

          <Link
            href="/login"
            className="
              inline-flex
              items-center
              gap-2
              mt-5
              bg-[#5a8139]
              hover:bg-[#4c7031]
              text-white
              px-5
              py-2.5
              rounded-lg
              text-sm
            "
          >
            Login
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (status: string) => {
    const normalizedStatus =
      status?.toLowerCase();

    const styles: Record<string, string> = {
      pending:
        "bg-orange-50 text-orange-600",

      confirmed:
        "bg-blue-50 text-blue-600",

      processing:
        "bg-blue-50 text-blue-600",

      shipped:
        "bg-purple-50 text-purple-600",

      delivered:
        "bg-green-50 text-green-600",

      completed:
        "bg-green-50 text-green-600",

      cancelled:
        "bg-red-50 text-red-600",
    };

    return (
      styles[normalizedStatus] ||
      "bg-gray-50 text-gray-500"
    );
  };

  // =========================================================
  // DATE FORMATTER
  // =========================================================

  const formatDate = (date: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="min-h-screen bg-[#F5F7F3] p-4 sm:p-6 lg:p-8">

      {/* =====================================================
          WELCOME SECTION
      ===================================================== */}

      <div className="mb-7">
        <div className="bg-[#1d2b1e] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">

          {/* Decorative circles */}

          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#5a8139]/20" />

          <div className="absolute -right-20 -bottom-17.5 w-52 h-52 rounded-full bg-[#5a8139]/10" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

            {/* Welcome */}

            <div>

              <p className="text-white/60 text-sm mb-2">
                Welcome back 👋
              </p>

              <h1 className="text-2xl sm:text-3xl font-semibold">
                Hello, {user.name || "User"}!
              </h1>

              <p className="mt-2 text-sm text-white/60 max-w-lg">
                Manage your orders, check your cart and
                keep track of your shopping activity.
              </p>

            </div>

            {/* User */}

          

          </div>
        </div>
      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

        {/* Total Orders */}

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="text-2xl font-bold text-[#192C27] mt-2">
                {ordersLoading ? "..." : totalOrders}
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                All your orders
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-[#E8F0E5] flex items-center justify-center">
              <ShoppingBag
                size={21}
                className="text-[#5a8139]"
              />
            </div>

          </div>
        </div>

        {/* Pending */}

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending Orders
              </p>

              <h2 className="text-2xl font-bold text-[#192C27] mt-2">
                {ordersLoading ? "..." : pendingOrders}
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Waiting for confirmation
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <Clock3
                size={21}
                className="text-orange-500"
              />
            </div>

          </div>
        </div>

        {/* Processing */}

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Processing
              </p>

              <h2 className="text-2xl font-bold text-[#192C27] mt-2">
                {ordersLoading
                  ? "..."
                  : processingOrders}
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Confirmed / processing
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Truck
                size={21}
                className="text-blue-500"
              />
            </div>

          </div>
        </div>

        {/* Completed */}

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h2 className="text-2xl font-bold text-[#192C27] mt-2">
                {ordersLoading
                  ? "..."
                  : completedOrders}
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Successfully delivered
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle2
                size={21}
                className="text-green-600"
              />
            </div>

          </div>
        </div>

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ===================================================
            RECENT ORDERS
        =================================================== */}

        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">

          {/* Header */}

          <div className="flex items-center justify-between p-5 border-b border-gray-100">

            <div>
              <h2 className="font-semibold text-[#192C27]">
                Recent Orders
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Your latest orders
              </p>
            </div>

            <Link
              href="/Dashboard/MyOrders"
              className="
                flex
                items-center
                gap-1
                text-sm
                text-[#5a8139]
                hover:text-[#2e4e2a]
                font-medium
              "
            >
              View All
              <ArrowRight size={15} />
            </Link>

          </div>

          {/* Order list */}

          <div className="divide-y divide-gray-100">

            {/* Loading */}

            {ordersLoading && (
              <div className="p-10 flex flex-col items-center justify-center">

                <div className="w-8 h-8 border-4 border-[#5a8139] border-t-transparent rounded-full animate-spin" />

                <p className="text-sm text-gray-400 mt-3">
                  Loading orders...
                </p>

              </div>
            )}

            {/* Error */}

            {!ordersLoading && ordersError && (
              <div className="p-10 text-center">

                <Package
                  size={40}
                  className="mx-auto text-red-300"
                />

                <p className="mt-3 text-sm text-red-500">
                  Failed to load orders.
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Please try again later.
                </p>

              </div>
            )}

            {/* Empty */}

            {!ordersLoading &&
              !ordersError &&
              orders.length === 0 && (
                <div className="p-10 text-center">

                  <Package
                    size={40}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-3 text-sm text-gray-500">
                    You haven't placed any orders yet.
                  </p>

                  <Link
                    href="/products"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mt-4
                      bg-[#5a8139]
                      hover:bg-[#4c7031]
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      text-sm
                    "
                  >
                    Start Shopping
                    <ArrowRight size={15} />
                  </Link>

                </div>
              )}

            {/* Orders */}

            {!ordersLoading &&
              !ordersError &&
              orders
                .slice(0, 5)
                .map((order: any) => {

                  const itemCount =
                    Array.isArray(order.items)
                      ? order.items.length
                      : 0;

                  return (
                    <div
                      key={order._id}
                      className="
                        p-5
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        justify-between
                        gap-4
                      "
                    >

                      {/* Order info */}

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-10
                            h-10
                            rounded-lg
                            bg-[#F5F7F3]
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          <Package
                            size={19}
                            className="text-[#5a8139]"
                          />
                        </div>

                        <div>

                          <p className="text-sm font-medium text-[#192C27]">
                            #
                            {order._id
                              ?.slice(-6)
                              .toUpperCase()}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(
                              order.createdAt
                            )}
                            {" · "}
                            {itemCount}{" "}
                            {itemCount === 1
                              ? "item"
                              : "items"}
                          </p>

                        </div>

                      </div>

                      {/* Total + Status */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          sm:justify-end
                          gap-4
                        "
                      >

                        <p className="text-sm font-semibold text-[#192C27]">
                          $
                          {Number(
                            order.totalAmount || 0
                          ).toFixed(2)}
                        </p>

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            capitalize
                            ${getStatusStyle(
                              order.status
                            )}
                          `}
                        >
                          {order.status || "Unknown"}
                        </span>

                      </div>

                    </div>
                  );
                })}

          </div>
        </div>

        {/* ===================================================
            QUICK ACTIONS
        =================================================== */}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

          <div className="p-5 border-b border-gray-100">

            <h2 className="font-semibold text-[#192C27]">
              Quick Actions
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Quickly access your account
            </p>

          </div>

          <div className="p-4 space-y-2">

            {/* My Orders */}

            <Link
              href="/Dashboard/MyOrders"
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-lg
                hover:bg-[#F5F7F3]
                transition
                group
              "
            >

              <div className="w-10 h-10 rounded-lg bg-[#E8F0E5] flex items-center justify-center">
                <ShoppingBag
                  size={18}
                  className="text-[#5a8139]"
                />
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-[#192C27]">
                  My Orders
                </p>

                <p className="text-xs text-gray-400">
                  View your orders
                </p>

              </div>

              <ArrowRight
                size={16}
                className="
                  text-gray-300
                  group-hover:text-[#5a8139]
                "
              />

            </Link>

            {/* Cart */}

            <Link
              href="/Cart"
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-lg
                hover:bg-[#F5F7F3]
                transition
                group
              "
            >

              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <ShoppingCart
                  size={18}
                  className="text-blue-500"
                />
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-[#192C27]">
                  My Cart
                </p>

                <p className="text-xs text-gray-400">
                  {cartLoading
                    ? "Loading..."
                    : `${cartCount} ${
                        cartCount === 1
                          ? "item"
                          : "items"
                      } in cart`}
                </p>

              </div>

              <ArrowRight
                size={16}
                className="
                  text-gray-300
                  group-hover:text-[#5a8139]
                "
              />

            </Link>

            {/* Profile */}

            <Link
              href="/Dashboard/Setting"
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-lg
                hover:bg-[#F5F7F3]
                transition
                group
              "
            >

              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <UserRound
                  size={18}
                  className="text-purple-500"
                />
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-[#192C27]">
                  Update Profile
                </p>

                <p className="text-xs text-gray-400">
                  Manage your account
                </p>

              </div>

              <ArrowRight
                size={16}
                className="
                  text-gray-300
                  group-hover:text-[#5a8139]
                "
              />

            </Link>

            {/* Products */}

            <Link
              href="/products"
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-lg
                hover:bg-[#F5F7F3]
                transition
                group
              "
            >

              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Leaf
                  size={18}
                  className="text-green-600"
                />
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-[#192C27]">
                  Continue Shopping
                </p>

                <p className="text-xs text-gray-400">
                  Explore our plants
                </p>

              </div>

              <ArrowRight
                size={16}
                className="
                  text-gray-300
                  group-hover:text-[#5a8139]
                "
              />

            </Link>

          </div>
        </div>
      </div>

      {/* =====================================================
          SHOPPING OVERVIEW
      ===================================================== */}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Account Information */}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-lg bg-[#E8F0E5] flex items-center justify-center">
              <UserRound
                size={19}
                className="text-[#5a8139]"
              />
            </div>

            <div>

              <h2 className="font-semibold text-[#192C27]">
                Account Information
              </h2>

              <p className="text-xs text-gray-400">
                Your account details
              </p>

            </div>

          </div>

          <div className="space-y-4">

            <div>
              <p className="text-xs text-gray-400 mb-1">
                Name
              </p>

              <p className="text-sm font-medium text-[#192C27]">
                {user.name || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">
                Email
              </p>

              <p className="text-sm font-medium text-[#192C27] break-all">
                {user.email || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">
                Account Type
              </p>

              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#E8F0E5] text-[#5a8139] text-xs font-medium capitalize">
                {user.role || "user"}
              </span>
            </div>

          </div>

          <Link
            href="/Dashboard/Setting"
            className="
              mt-5
              w-full
              inline-flex
              items-center
              justify-center
              gap-2
              border
              border-[#5a8139]
              text-[#5a8139]
              hover:bg-[#5a8139]
              hover:text-white
              transition
              rounded-lg
              py-2.5
              text-sm
              font-medium
            "
          >
            Update Profile
            <ArrowRight size={15} />
          </Link>

        </div>

        {/* Shopping Overview */}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <CreditCard
                size={19}
                className="text-blue-500"
              />
            </div>

            <div>

              <h2 className="font-semibold text-[#192C27]">
                Shopping Overview
              </h2>

              <p className="text-xs text-gray-400">
                Your shopping activity
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            {/* Total Orders */}

            <div className="bg-[#F5F7F3] rounded-lg p-4">

              <p className="text-xs text-gray-400">
                Orders
              </p>

              <p className="text-xl font-bold text-[#192C27] mt-1">
                {ordersLoading
                  ? "..."
                  : totalOrders}
              </p>

            </div>

            {/* Cart */}

            <div className="bg-[#F5F7F3] rounded-lg p-4">

              <p className="text-xs text-gray-400">
                Cart Items
              </p>

              <p className="text-xl font-bold text-[#192C27] mt-1">
                {cartLoading
                  ? "..."
                  : cartCount}
              </p>

            </div>

            {/* Completed */}

            <div className="bg-[#F5F7F3] rounded-lg p-4">

              <p className="text-xs text-gray-400">
                Delivered
              </p>

              <p className="text-xl font-bold text-[#192C27] mt-1">
                {ordersLoading
                  ? "..."
                  : completedOrders}
              </p>

            </div>

            {/* Total Spent */}

            <div className="bg-[#F5F7F3] rounded-lg p-4">

              <p className="text-xs text-gray-400">
                Total Spent
              </p>

              <p className="text-xl font-bold text-[#192C27] mt-1">
                {ordersLoading
                  ? "..."
                  : `$${totalSpent.toFixed(2)}`}
              </p>

            </div>

          </div>

          <Link
            href="/products"
            className="
              mt-5
              w-full
              inline-flex
              items-center
              justify-center
              gap-2
              bg-[#5a8139]
              hover:bg-[#4c7031]
              text-white
              rounded-lg
              py-2.5
              text-sm
              font-medium
              transition
            "
          >
            Continue Shopping
            <ArrowRight size={15} />
          </Link>

        </div>

      </div>

      {/* =====================================================
          CART SUMMARY
      ===================================================== */}

      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm">

        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-gray-100">

          <div>

            <h2 className="font-semibold text-[#192C27]">
              Your Cart
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Items currently in your shopping cart
            </p>

          </div>

          <Link
            href="/Cart"
            className="
              inline-flex
              items-center
              gap-1
              text-sm
              font-medium
              text-[#5a8139]
              hover:text-[#2e4e2a]
            "
          >
            View Cart
            <ArrowRight size={15} />
          </Link>

        </div>

        {/* Cart content */}

        <div className="p-5">

          {/* Loading */}

          {cartLoading && (
            <div className="flex justify-center py-8">

              <div className="w-7 h-7 border-4 border-[#5a8139] border-t-transparent rounded-full animate-spin" />

            </div>
          )}

          {/* Cart has items */}

          {!cartLoading &&
            cartItems &&
            cartItems.length > 0 && (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {cartItems
                  .slice(0, 4)
                  .map(
                    (
                      item: any,
                      index: number
                    ) => {

                      /*
                       * Supports both:
                       *
                       * item.name
                       *
                       * and
                       *
                       * item.product.name
                       */

                      const product =
                        item.product ||
                        item;

                      const productName =
                        product.name ||
                        "Plant";

                      const productImage =
                        product.image || "";

                      const productPrice =
                        product.price || 0;

                      const quantity =
                        item.quantity || 1;

                      return (
                        <div
                          key={
                            item._id ||
                            item.id ||
                            index
                          }
                          className="
                            border
                            border-gray-100
                            rounded-xl
                            p-3
                            hover:shadow-sm
                            transition
                          "
                        >

                          <div className="flex items-center gap-3">

                            {/* Image */}

                            <div
                              className="
                                w-16
                                h-16
                                rounded-lg
                                bg-[#F5F7F3]
                                overflow-hidden
                                shrink-0
                              "
                            >

                              {productImage ? (
                                <Image
                                  src={productImage}
                                  alt={productName}
                                  width={64}
                                  height={64}
                                  className="
                                    w-full
                                    h-full
                                    object-cover
                                  "
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Leaf
                                    size={22}
                                    className="text-[#5a8139]"
                                  />
                                </div>
                              )}

                            </div>

                            {/* Info */}

                            <div className="min-w-0">

                              <p className="text-sm font-medium text-[#192C27] truncate">
                                {productName}
                              </p>

                              <p className="text-xs text-gray-400 mt-1">
                                Qty: {quantity}
                              </p>

                              <p className="text-sm font-semibold text-[#5a8139] mt-1">
                                $
                                {Number(
                                  productPrice
                                ).toFixed(2)}
                              </p>

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )}

              </div>
            )}

          {/* Empty Cart */}

          {!cartLoading &&
            (!cartItems ||
              cartItems.length === 0) && (

              <div className="py-8 text-center">

                <div className="w-14 h-14 rounded-full bg-[#F5F7F3] mx-auto flex items-center justify-center">

                  <ShoppingCart
                    size={24}
                    className="text-[#5a8139]"
                  />

                </div>

                <p className="mt-3 text-sm font-medium text-[#192C27]">
                  Your cart is empty
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Add some beautiful plants to your cart.
                </p>

                <Link
                  href="/products"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-4
                    bg-[#5a8139]
                    hover:bg-[#4c7031]
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    transition
                  "
                >
                  Browse Products
                  <ArrowRight size={15} />
                </Link>

              </div>
            )}

        </div>
      </div>

    </div>
  );
};

export default UserDashboard;