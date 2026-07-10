"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export function ClicksChart({ data }: { data: { day: string; clicks: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#434655", fontSize: 12 }}
        />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#434655", fontSize: 12 }} />
        <Tooltip
          cursor={{ fill: "#eff4ff" }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #c3c6d7",
            fontSize: 13,
          }}
        />
        <Bar dataKey="clicks" radius={[6, 6, 0, 0]} fill="#dce9ff" />
      </BarChart>
    </ResponsiveContainer>
  );
}
