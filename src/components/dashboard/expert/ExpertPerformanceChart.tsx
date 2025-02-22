
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: '1月', consultations: 15, satisfaction: 4.8 },
  { month: '2月', consultations: 18, satisfaction: 4.7 },
  { month: '3月', consultations: 22, satisfaction: 4.9 },
  { month: '4月', consultations: 20, satisfaction: 4.8 },
  { month: '5月', consultations: 25, satisfaction: 4.9 },
  { month: '6月', consultations: 23, satisfaction: 4.8 },
];

const formatConsultations = (value: number) => {
  return `${value} 件`;
};

const formatSatisfaction = (value: number) => {
  return value.toFixed(1);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
      <p className="font-medium text-sm mb-2">{label}</p>
      {payload.map((item: any, index: number) => (
        <p key={index} className="text-sm" style={{ color: item.color }}>
          {item.name === '相談件数' ? formatConsultations(item.value) : `${item.value} 点`}
        </p>
      ))}
    </div>
  );
};

export const ExpertPerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>実績推移</CardTitle>
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
              <XAxis 
                dataKey="month" 
                label={{ 
                  value: '月', 
                  position: 'insideBottomRight', 
                  offset: -5 
                }} 
              />
              <YAxis 
                yAxisId="left"
                tickFormatter={formatConsultations}
                label={{ 
                  value: '相談件数', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                domain={[0, 5]}
                tickFormatter={formatSatisfaction}
                label={{ 
                  value: '満足度', 
                  angle: 90, 
                  position: 'insideRight',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="consultations"
                name="相談件数"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="satisfaction"
                name="満足度"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
