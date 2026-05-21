import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

import { useEffect, useState } from "react";

import api from "@/services/api";

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const TrendChart = () => {
  const [data, setData] = useState<
    {
      month: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        const res = await api.get(
          "/dashboard/trends"
        );

        const formatted =
          res.data.data.map(
            (item: any) => ({
              month:
                months[item.month],

              value: Number(
                item.total
              ),
            })
          );

        setData(formatted);

      } catch (error) {
        console.error(
          "Failed to fetch trends",
          error
        );
      }
    };

    fetchTrendData();
  }, []);

  return (
    <Card
      className="
        border
        border-slate-200
        rounded-3xl
        bg-white
        shadow-sm
      "
    >
      <CardContent className="p-6">

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-800">
            Monthly Financial Trends
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Monitor your income and expenses over time.
          </p>
        </div>

        <div className="h-[300px] w-full mt-4">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 0,
              }}
            >

              <defs>

                <linearGradient
                  id="gradientColor"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#6C63FF"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="100%"
                    stopColor="#6C63FF"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#CBD5E1"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748B",
                  fontSize: 12,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748B",
                  fontSize: 12,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(
                    value
                  ).toLocaleString()}`,
                  "Amount",
                ]}
                contentStyle={{
                  borderRadius: "14px",
                  border: "none",
                  background: "#0F172A",
                  color: "white",
                  padding: "10px 14px",
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#6C63FF"
                strokeWidth={4}
                fill="url(#gradientColor)"
                dot={{
                  r: 5,
                  fill: "#6C63FF",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                activeDot={{
                  r: 7,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </CardContent>
    </Card>
  );
};

export default TrendChart;