import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

import { useEffect, useState } from "react";

import api from "@/services/api";

import type { CategoryData } from "@/types/dashboard";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F59E0B",
];

const CategoryPieChart = () => {

  const [data, setData] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(
          "/dashboard/categories"
        );

        const formatted =
          res.data.data.map(
            (item: CategoryData) => ({
              name: item._id,
              value: item.total,
            })
          );

        setData(formatted);
      } catch (error) {
        console.error(
          "Failed to fetch categories",
          error
        );
      }
    };

    fetchCategories();
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
            Category Breakdown
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Spending distribution across categories.
          </p>
        </div>

        <div className="h-72">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={5}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;