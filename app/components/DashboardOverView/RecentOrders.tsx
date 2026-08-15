/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllOrders } from "@/app/lib/API/getAllOrders";

export default async function RecentOrders() {
  const data = await getAllOrders(1, 5);

  const orders = data?.orders || [];

  return (
    <section className="rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between text-2xl">
        <h3 className="text-sm font-semibold text-gray-800">
          Recent orders
        </h3>

        <button className="text-gray-400">•••</button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-left text-[9px]  text-black font-bold text-4xl">
              <th className="pb-3 font-medium">No.</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Items</th>
              <th className="pb-3 font-medium">Paid</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any, index: number) => {
              const status = order.status?.toLowerCase();

              return (
                <tr
                  key={order._id}
                  className="border-b border-gray-50 last:border-0"
                >
                  {/* No */}
                  <td className="py-3 text-[10px] text-gray-700">
                    #{order._id.slice(-5).toUpperCase()}
                  </td>

                  {/* Date */}
                  <td className="py-3 text-[10px] text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Customer */}
                  <td className="py-3 text-[10px] text-gray-700">
                    {order.shippingInfo?.fullName || "N/A"}
                  </td>

                  {/* Items */}
                  <td className="py-3 text-[10px] text-gray-600">
                    {order.items?.length || 0} items
                  </td>

                  {/* Paid */}
                  <td className="py-3">
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] text-emerald-600">
                      Yes
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-[9px] ${
                        status === "pending"
                          ? "bg-yellow-50 text-yellow-600"
                          : status === "confirmed"
                            ? "bg-emerald-50 text-emerald-600"
                            : status === "delivered"
                              ? "bg-blue-50 text-blue-600"
                              : status === "cancelled"
                                ? "bg-red-50 text-red-500"
                                : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {order.status || "Unknown"}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="py-3 text-right text-[10px] font-medium text-gray-700">
                    ${Number(order.totalAmount || 0).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* No Orders */}
        {orders.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-400">
            No recent orders found.
          </div>
        )}
      </div>
    </section>
  );
}