import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

import { useEffect, useState } from "react";

import api from "@/services/api";

import type { TrendData } from "@/types/dashboard";

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
            (item: TrendData) => ({
              month: months[item.month],
              value: item.total,
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
        border-0
        rounded-3xl
        bg-white/80
        backdrop-blur-xl
        shadow-md
      "
    >
      <CardContent className="p-6">

        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800">
            Monthly Financial Trends
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Monitor your financial growth and expenses.
          </p>
        </div>

        <div className="h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366F1"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: "#6366F1",
                }}
                activeDot={{
                  r: 8,
                }}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

      </CardContent>
    </Card>
  );
};

export default TrendChart;