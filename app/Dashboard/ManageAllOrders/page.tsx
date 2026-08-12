import OrderTable from "@/app/components/OrderTable";
import { getAllOrders } from "@/app/lib/API/getAllOrders";
import React from "react";


const page = async () => {
  const orders = await getAllOrders();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage All Orders</h1>
        <p className="text-sm text-gray-500">
          Manage and update customer orders
        </p>
      </div>

      <OrderTable orders={orders} />
    </div>
  );
};

export default page;