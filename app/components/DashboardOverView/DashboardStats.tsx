/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllOrders } from "@/app/lib/API/getAllOrders";
import { getUsers } from "@/app/lib/API/getUsers";

export default async function DashboardStats() {
  const [usersData, ordersData] = await Promise.all([
    getUsers(),
    getAllOrders(1, 10000),
  ]);

  // Users count
  const totalUsers =
    Array.isArray(usersData)
      ? usersData.length
      : usersData?.users?.length ?? usersData?.totalUsers ?? 0;

  // Orders
  const orders = Array.isArray(ordersData)
    ? ordersData
    : ordersData?.orders ?? [];

  const totalOrders =
    ordersData?.totalOrders ?? orders.length;

  // Total sales
  const salesTotal = orders.reduce(
    (total: number, order: any) =>
      total + Number(order.totalAmount || 0),
    0,
  );

  // Average order value
  const averageOrderValue =
    totalOrders > 0 ? salesTotal / totalOrders : 0;

  const stats = [
    {
      title: "Total users",
      value: totalUsers.toLocaleString(),
      change: "—",
      positive: true,
    },
    {
      title: "Total orders",
      value: totalOrders.toLocaleString(),
      change: "—",
      positive: true,
    },
    {
      title: "Sales total",
      value: `$${salesTotal.toFixed(2)}`,
      change: "—",
      positive: true,
    },
    {
      title: "Average order value",
      value: `$${averageOrderValue.toFixed(2)}`,
      change: "—",
      positive: true,
    },
  ];

  return (
    <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <p className="text-sm font-bold text-gray-700">
              {stat.title}
            </p>

            <button
              type="button"
              className="text-xs tracking-widest text-gray-400 transition hover:text-gray-600"
            >
              •••
            </button>
          </div>

          {/* Value */}
          <div className="mt-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              {stat.value}
            </h2>

            {/* Change */}
            <div className="mt-2 flex items-center justify-end gap-1">
              <span
                className={`text-xs font-medium ${
                  stat.positive
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {stat.positive ? "↑" : "↓"} {stat.change}
              </span>

              <span className="text-[10px] text-gray-400">
                Compared to December 2023
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}