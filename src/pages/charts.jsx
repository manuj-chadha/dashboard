import ChartContainer from '../components/charts/chart-container';
import { chartData } from '../lib/dummy-data';

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartContainer
        type="bar"
        data={chartData.products}
        title="Product Sales"
        dataKey="sales"
      />
      
      <ChartContainer
        type="line"
        data={chartData.users}
        title="User Growth"
        dataKey="users"
      />
      
      <ChartContainer
        type="pie"
        data={chartData.devices}
        title="Device Usage"
        dataKey="value"
      />
      
      <ChartContainer
        type="area"
        data={chartData.visitors}
        title="Website Visitors"
        dataKey="visitors"
      />
    </div>
  );
}
