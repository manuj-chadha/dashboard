import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Settings, Download, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const actions = [
  {
    icon: Plus,
    label: 'Add User',
    description: 'Create a new user account',
    action: 'add-user',
    colors: {
      bg: 'bg-gradient-to-r from-green-200 to-teal-200 dark:from-green-700 dark:to-teal-700',
      iconBg: 'bg-green-300 dark:bg-green-600',
      text: 'text-green-800 dark:text-green-300',
      hoverBg: 'hover:from-green-300 hover:to-teal-300 dark:hover:from-green-600 dark:hover:to-teal-600',
      ring: 'ring-green-400',
    },
  },
  {
    icon: FileText,
    label: 'New Report',
    description: 'Generate analytics report',
    action: 'new-report',
    colors: {
      bg: 'bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-700 dark:to-indigo-700',
      iconBg: 'bg-blue-300 dark:bg-blue-600',
      text: 'text-blue-800 dark:text-blue-300',
      hoverBg: 'hover:from-blue-300 hover:to-indigo-300 dark:hover:from-blue-600 dark:hover:to-indigo-600',
      ring: 'ring-blue-400',
    },
  },
  {
    icon: Settings,
    label: 'Settings',
    description: 'System configuration',
    action: 'settings',
    colors: {
      bg: 'bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700',
      iconBg: 'bg-purple-300 dark:bg-purple-600',
      text: 'text-purple-800 dark:text-purple-300',
      hoverBg: 'hover:from-purple-300 hover:to-pink-300 dark:hover:from-purple-600 dark:hover:to-pink-600',
      ring: 'ring-purple-400',
    },
  },
  {
    icon: Download,
    label: 'Export Data',
    description: 'Download user data as CSV',
    action: 'export',
    colors: {
      bg: 'bg-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-600 dark:to-orange-600',
      iconBg: 'bg-yellow-300 dark:bg-yellow-500',
      text: 'text-yellow-900 dark:text-yellow-300',
      hoverBg: 'hover:from-yellow-300 hover:to-orange-300 dark:hover:from-yellow-500 dark:hover:to-orange-500',
      ring: 'ring-yellow-400',
    },
  },
];

export default function QuickActions() {
  const { toast } = useToast();

  const handleAction = (actionType, label) => {
    switch (actionType) {
      case 'add-user':
        toast({
          title: 'Add User',
          description: 'User creation form would open here',
        });
        break;
      case 'new-report':
        toast({
          title: 'Generating Report',
          description: 'Analytics report is being prepared',
        });
        break;
      case 'settings':
        toast({
          title: 'System Settings',
          description: 'Settings panel would open here',
        });
        break;
      case 'export':
        const csvData =
          'name,email,role,status\nJohn Doe,john@example.com,Admin,active\nJane Smith,jane@example.com,User,active';
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        toast({
          title: 'Export Complete',
          description: 'User data has been downloaded as CSV',
        });
        break;
      default:
        toast({
          title: label,
          description: 'Action executed successfully',
        });
    }
  };

  return (
    <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-md border border-gray-100 dark:border-gray-700 rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-gray-900 dark:text-gray-100 text-xl font-semibold">
          <TrendingUp size={24} className="text-primary" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {actions.map(({ icon: Icon, label, description, action, colors }) => (
            <button
              key={label}
              onClick={() => handleAction(action, label)}
              type="button"
              className={`${colors.bg} ${colors.text} flex flex-col items-center p-6 space-y-3 rounded-lg shadow-sm transition-all duration-300 ease-in-out
                ${colors.hoverBg} focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-${colors.ring}`}
              style={{ minHeight: '160px' }}
            >
              <div
                className={`${colors.iconBg} rounded-full w-12 h-12 flex items-center justify-center shadow`}
              >
                <Icon size={28} />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold truncate">{label}</div>
                <div className="text-sm opacity-90 leading-relaxed max-w-[180px] mx-auto">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
