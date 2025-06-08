import MetricCard from '../components/dashboard/metric-card';
import RecentActivity from '../components/dashboard/recent-activity';
import QuickActions from '../components/dashboard/quick-actions';
import ChartContainer from '../components/charts/chart-container';
import ThemeSelector from '../components/theme/theme-selector.jsx';
import { dashboardMetrics, recentActivity, chartData } from '../lib/dummy-data';

export default function Dashboard() {
  return (
    <div
      className="space-y-8 px-4 sm:px-6 lg:px-8 pb-8 min-h-screen"
      style={{
        backgroundColor: 'var(--background)',      // use theme background
        color: 'var(--foreground)',                 // text color based on theme
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivity} />
        <QuickActions />
        {/* Enable Theme Selector as needed */}
        {/* <ThemeSelector /> */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          type="line"
          data={chartData.revenue}
          title="Revenue Overview"
          dataKey="value"
        />
        <ChartContainer
          type="bar"
          data={chartData.products}
          title="Top Products"
          dataKey="sales"
        />
      </div>
    </div>
  );
}
