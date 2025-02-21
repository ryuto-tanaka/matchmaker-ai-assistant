
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: '1月', revenue: 800000, projects: 8 },
  { month: '2月', revenue: 950000, projects: 10 },
  { month: '3月', revenue: 1200000, projects: 12 },
  { month: '4月', revenue: 1000000, projects: 11 },
  { month: '5月', revenue: 1300000, projects: 14 },
  { month: '6月', revenue: 1200000, projects: 12 },
];

export const MonthlyChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>月間推移</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="売上"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="projects"
                name="案件数"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
