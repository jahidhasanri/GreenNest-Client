const stats = [
  {
    title: "Total users",
    value: "678",
    change: "46%",
    positive: true,
  },
  {
    title: "Total orders",
    value: "678",
    change: "46%",
    positive: true,
  },
  {
    title: "Sales total",
    value: "$2456",
    change: "26%",
    positive: true,
  },
  {
    title: "Average order value",
    value: "$372.98",
    change: "16%",
    positive: false,
  },
  
];

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-8">
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