import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Users, ShoppingCart, Percent, TrendingUp, TrendingDown } from 'lucide-react';

const iconMap = {
  DollarSign,
  Users,
  ShoppingCart,
  Percent
};

const colorMap = {
  green: 'bg-gradient-to-br from-green-50 to-green-100 text-green-600 border border-green-200',
  blue: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200',
  red: 'bg-gradient-to-br from-red-50 to-red-100 text-red-600 border border-red-200',
  purple: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 border border-purple-200'
};

export default function MetricCard({ title, value, change, changeType, icon, color }) {
  const Icon = iconMap[icon];
  const iconColorClass = colorMap[color];
  const changeColorClass = changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  const TrendIcon = changeType === 'positive' ? TrendingUp : TrendingDown;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-background to-muted/30 h-full dark:bg-gray-900">
      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        
        {/* Left side: text */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
          <div className="flex items-center justify-center sm:justify-start space-x-1">
            <TrendIcon size={14} className={changeColorClass} />
            <p className={`text-sm font-medium ${changeColorClass}`}>{change}</p>
          </div>
        </div>
        
        {/* Right side: icon */}
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconColorClass} shadow-sm shrink-0`}
        >
          <Icon size={28} />
        </div>
      </CardContent>
    </Card>
  );
}
