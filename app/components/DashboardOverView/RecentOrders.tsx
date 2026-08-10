const orders = [
  {
    no: "#00745",
    date: "2022-12-23",
    customer: "George Carsi",
    items: "2 items",
    paid: "Yes",
    status: "Pending",
    total: "$2,742.00",
  },
  {
    no: "#00321",
    date: "2022-11-25",
    customer: "Hans Jensen",
    items: "11 items",
    paid: "No",
    status: "Complete",
    total: "$204.00",
  },
  {
    no: "#00114",
    date: "2022-10-22",
    customer: "Vivo Lock",
    items: "3 items",
    paid: "No",
    status: "Complete",
    total: "$5,039.00",
  },
  {
    no: "#00422",
    date: "2022-09-17",
    customer: "Thorfin Odd",
    items: "4 items",
    paid: "No",
    status: "Cancel",
    total: "$79.00",
  },
  {
    no: "#00332",
    date: "2022-08-12",
    customer: "Thor Odinson",
    items: "9 items",
    paid: "Yes",
    status: "Hold",
    total: "$826.00",
  },
];

export default function RecentOrders() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">
          Recent orders
        </h3>

        <button className="text-gray-400">•••</button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-left text-[9px] text-gray-400">
              <th className="pb-3 font-medium">No.</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Items</th>
              <th className="pb-3 font-medium">Paid</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.no}
                className="border-b border-gray-50 last:border-0"
              >
                <td className="py-3 text-[10px] text-gray-700">
                  {order.no}
                </td>

                <td className="py-3 text-[10px] text-gray-600">
                  {order.date}
                </td>

                <td className="py-3 text-[10px] text-gray-600">
                  {order.date}
                </td>

                <td className="py-3 text-[10px] text-gray-700">
                  {order.customer}
                </td>

                <td className="py-3 text-[10px] text-gray-600">
                  {order.items}
                </td>

                <td className="py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-[9px] ${
                      order.paid === "Yes"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {order.paid}
                  </span>
                </td>

                <td className="py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-[9px] ${
                      order.status === "Pending"
                        ? "bg-blue-50 text-blue-500"
                        : order.status === "Complete"
                        ? "bg-emerald-50 text-emerald-600"
                        : order.status === "Cancel"
                        ? "bg-red-50 text-red-500"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-3 text-right text-[10px] font-medium text-gray-700">
                  {order.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}