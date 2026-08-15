/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import OrderTable from "@/app/components/OrderTable";
import { getAllOrders } from "@/app/lib/API/getAllOrders";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (page: number) => {
    try {
      setLoading(true);

      const data = await getAllOrders(page, 10);

      setOrders(data.orders);
      setTotalOrders(data.totalOrders);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <OrderTable
      orders={orders}
      totalOrders={totalOrders}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default OrdersPage;