// ============================================================================
// VWFS Performance Platform - Chart Wrapper (Recharts)
// ============================================================================

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

type ChartType = 'bar' | 'line' | 'pie' | 'area';

interface ChartWrapperProps {
  type: ChartType;
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  title?: string;
  height?: number;
  colors?: string[];
}

const VWFS_CHART_COLORS = [
  '#004666', // brand
  '#05CE9F', // accent
  '#66E4EE', // accent-light
  '#038364', // success
  '#CD3B4F', // error
  '#F5E850', // warning
  '#A8ADB3', // surface-dark
  '#7C3AED', // purple
];

export function ChartWrapper({
  type,
  data,
  xKey,
  yKeys,
  title,
  height = 300,
  colors,
}: ChartWrapperProps) {
  const palette = colors ?? VWFS_CHART_COLORS;

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 12, fill: '#4C5356' }}
              axisLine={{ stroke: '#A8ADB3' }}
            />
            <YAxis tick={{ fontSize: 12, fill: '#4C5356' }} axisLine={{ stroke: '#A8ADB3' }} />
            <Tooltip
              contentStyle={{
                borderRadius: 6,
                border: '1px solid #E5E7EB',
                fontSize: 12,
              }}
            />
            {yKeys.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {yKeys.map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                fill={palette[i % palette.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 12, fill: '#4C5356' }}
              axisLine={{ stroke: '#A8ADB3' }}
            />
            <YAxis tick={{ fontSize: 12, fill: '#4C5356' }} axisLine={{ stroke: '#A8ADB3' }} />
            <Tooltip
              contentStyle={{
                borderRadius: 6,
                border: '1px solid #E5E7EB',
                fontSize: 12,
              }}
            />
            {yKeys.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {yKeys.map((key, i) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={palette[i % palette.length]}
                strokeWidth={2}
                dot={{ r: 3, fill: palette[i % palette.length] }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 12, fill: '#4C5356' }}
              axisLine={{ stroke: '#A8ADB3' }}
            />
            <YAxis tick={{ fontSize: 12, fill: '#4C5356' }} axisLine={{ stroke: '#A8ADB3' }} />
            <Tooltip
              contentStyle={{
                borderRadius: 6,
                border: '1px solid #E5E7EB',
                fontSize: 12,
              }}
            />
            {yKeys.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {yKeys.map((key, i) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={palette[i % palette.length]}
                fill={palette[i % palette.length]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={yKeys[0]}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={height / 3}
              label={({ name, percent }: any) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={{ stroke: '#A8ADB3' }}
            >
              {data.map((_entry, i) => (
                <Cell key={`cell-${i}`} fill={palette[i % palette.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 6,
                border: '1px solid #E5E7EB',
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        );
    }
  };

  return (
    <div className="card">
      {title && (
        <h4 className="text-sm font-bold text-vwfs-brand mb-4">{title}</h4>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

export default ChartWrapper;
