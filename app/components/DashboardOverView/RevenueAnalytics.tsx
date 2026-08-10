"use client";

const revenueData = [
  { month: "Jan", value: 480 },
  { month: "Feb", value: 220 },
  { month: "Mar", value: 750 },
  { month: "Apr", value: 350 },
  { month: "May", value: 640 },
  { month: "Jun", value: 1080 },
  { month: "Jul", value: 750 },
  { month: "Aug", value: 570 },
  { month: "Sep", value: 1080 },
  { month: "Oct", value: 700 },
  { month: "Nov", value: 960 },
  { month: "Dec", value: 400 },
];

const trafficData = [
  {
    source: "Facebook",
    orders: 22,
    amount: "$2,742.00",
    color: "#B5EF38",
  },
  {
    source: "YouTube",
    orders: 27,
    amount: "$3,272.00",
    color: "#397B6F",
  },
  {
    source: "Twitter",
    orders: 10,
    amount: "$2,303.00",
    color: "#F5A23A",
  },
  {
    source: "Instagram",
    orders: 25,
    amount: "$2,922.00",
    color: "#E5E5E5",
  },
];

export default function RevenueAnalytics() {
  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr] mt-8 mb-8">
      {/* Revenue Analytics */}
      <div className="rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            Revenue analytics
          </h3>

          <button className="text-xs font-medium text-gray-800">
            Yearly⌄
          </button>
        </div>

        {/* Chart */}
        <div className="mt-6">
          <div className="relative h-65">
            {/* Y Axis */}
            <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-[9px] text-gray-400">
              <span>$1200</span>
              <span>$1000</span>
              <span>$800</span>
              <span>$600</span>
              <span>$400</span>
              <span>$200</span>
              <span>$0</span>
            </div>

            {/* Chart area */}
            <div className="absolute left-9 right-0 top-0 h-full">
              {/* Grid lines */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4, 5, 6].map((line) => (
                  <div
                    key={line}
                    className="border-t border-gray-100"
                  />
                ))}
              </div>

              {/* Bars */}
              <div className="relative flex h-full items-end justify-between gap-1 px-1 pb-5">
                {revenueData.map((item) => (
                  <div
                    key={item.month}
                    className="group relative flex h-full flex-1 items-end justify-center"
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-[calc(100%-10px)] z-10 hidden rounded bg-gray-800 px-2 py-1 text-[9px] text-white group-hover:block">
                      ${item.value}
                    </div>

                    <div
                      className="w-[65%] max-w-7 rounded-t-[5px] bg-[#176B5E] transition-all duration-200 hover:bg-[#0f594e]"
                      style={{
                        height: `${(item.value / 1200) * 100}%`,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* X Axis */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                {revenueData.map((item) => (
                  <span
                    key={item.month}
                    className="text-[9px] text-gray-400"
                  >
                    {item.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Source */}
      <div className="rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            Sales by traffic source
          </h3>

          <button className="text-gray-400">•••</button>
        </div>

        {/* Donut */}
        <div className="flex justify-center py-6">
          <div
            className="relative h-36 w-36 rounded-full"
            style={{
              background:
                "conic-gradient(#B5EF38 0deg 110deg, #E5E5E5 110deg 200deg, #F5A23A 200deg 235deg, #397B6F 235deg 360deg)",
            }}
          >
            <div className="absolute inset-7.5 rounded-full bg-white" />
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_55px_95px] border-b border-gray-100 pb-2 text-[10px] text-gray-400">
          <span>Source</span>
          <span>Orders</span>
          <span>Amount</span>
        </div>

        {/* Traffic data */}
        <div className="mt-2 space-y-3">
          {trafficData.map((item) => (
            <div
              key={item.source}
              className="grid grid-cols-[1fr_55px_95px] items-center text-[10px]"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span className="text-gray-600">
                  {item.source}
                </span>
              </div>

              <span className="text-gray-600">
                {item.orders}
              </span>

              <span className="text-gray-600">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}