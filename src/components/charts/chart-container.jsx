import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function ChartContainer({ type, data, title, dataKey, xAxisKey = 'name' }) {
  const renderChart = () => {
    if (!data || !data.length) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground italic">
          No data available
        </div>
      );
    }

    const commonProps = {
      margin: { top: 25, right: 30, left: 20, bottom: 20 },
    };

    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey={xAxisKey} tick={{ fill: '#334155', fontWeight: 600 }} />
            <YAxis tick={{ fill: '#334155' }} />
            <Tooltip
              wrapperClassName="shadow-lg rounded-md bg-white p-2"
              contentStyle={{ borderRadius: 8 }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontWeight: '600', color: '#64748b' }}
            />
            <Bar 
              dataKey={dataKey} 
              fill={COLORS[0]} 
              radius={[6, 6, 0, 0]} 
              barSize={40}
              animationDuration={700}
            />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data} {...commonProps}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e0e7ff" />
            <XAxis dataKey={xAxisKey} tick={{ fill: '#334155', fontWeight: 600 }} />
            <YAxis tick={{ fill: '#334155' }} />
            <Tooltip
              wrapperClassName="shadow-lg rounded-md bg-white p-2"
              contentStyle={{ borderRadius: 8 }}
              cursor={{ stroke: '#10b981', strokeWidth: 2 }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontWeight: '600', color: '#64748b' }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={COLORS[1]} 
              strokeWidth={3} 
              dot={{ r: 5, strokeWidth: 2, fill: '#10b981' }}
              activeDot={{ r: 7 }}
              animationDuration={800}
            />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              dataKey={dataKey}
              fill={COLORS[2]}
              animationDuration={900}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke="#fff" 
                  strokeWidth={2} 
                />
              ))}
            </Pie>
            <Tooltip
              wrapperClassName="shadow-lg rounded-md bg-white p-2"
              contentStyle={{ borderRadius: 8 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontWeight: '600', color: '#64748b', marginTop: 10 }}
            />
          </PieChart>
        );

      case 'area':
        return (
          <AreaChart data={data} {...commonProps}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[4]} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS[4]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey={xAxisKey} tick={{ fill: '#334155', fontWeight: 600 }} />
            <YAxis tick={{ fill: '#334155' }} />
            <Tooltip
              wrapperClassName="shadow-lg rounded-md bg-white p-2"
              contentStyle={{ borderRadius: 8 }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontWeight: '600', color: '#64748b' }}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={COLORS[4]} 
              fill="url(#colorUv)" 
              strokeWidth={3} 
              animationDuration={900}
            />
          </AreaChart>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground italic">
            Unsupported chart type
          </div>
        );
    }
  };

  return (
    <Card className="shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg px-6 py-4 shadow-md">
        <CardTitle className="text-xl font-semibold tracking-wide">{title}</CardTitle>
      </CardHeader>

      <CardContent className="h-80 p-6">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
