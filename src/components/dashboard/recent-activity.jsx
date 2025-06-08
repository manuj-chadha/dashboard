import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, User, ShoppingCart, CreditCard } from 'lucide-react';
import { useTheme } from '../../contexts/theme-context.jsx';  // assuming your ThemeContext hook

const activityIcons = {
  user_registered: User,
  order_completed: ShoppingCart,
  payment_received: CreditCard,
};

const activityColorVars = {
  user_registered: { text: 'var(--blue-600)', bg: 'var(--blue-100)' },
  order_completed: { text: 'var(--green-600)', bg: 'var(--green-100)' },
  payment_received: { text: 'var(--purple-600)', bg: 'var(--purple-100)' },
};

export default function RecentActivity({ activities }) {
  const { theme } = useTheme();

  // Define fallback colors in CSS variables or directly here for the "blue", "green", "purple" used above
  // If these vars don't exist, you can create them or just use closest CSS vars or hardcoded colors

  return (
    <Card
      className="w-full shadow-lg rounded-2xl backdrop-blur-sm border dark:bg-gray-900"
      style={{
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-xl font-bold tracking-tight" style={{ color: 'var(--primary)' }}>
          <Clock size={24} style={{ color: 'var(--primary)' }} />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 sm:space-y-5">
          {activities.map(({ id, type, message, time }) => {
            const Icon = activityIcons[type] || User;

            // Fallback color if the theme variable is missing, fallback to gray shades using CSS vars
            const iconColors = activityColorVars[type] || {
              text: 'var(--foreground)',
              bg: 'var(--muted)',
            };

            return (
              <div
                key={id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border cursor-pointer group transition duration-300"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--card)',
                }}
              >
                <div className="flex items-center space-x-4 min-w-0 flex-1 mb-3 sm:mb-0">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow transition-transform duration-300 group-hover:scale-105"
                    aria-hidden="true"
                    style={{
                      backgroundColor: iconColors.bg,
                      color: iconColors.text,
                      boxShadow: `0 0 8px ${iconColors.text}50`,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="text-base font-medium truncate group-hover:text-primary"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {message}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      {type === 'user_registered' && 'New user joined the platform'}
                      {type === 'order_completed' && 'Order successfully processed'}
                      {type === 'payment_received' && 'Payment transaction completed'}
                    </p>
                  </div>
                </div>

                <time
                  className="inline-block sm:ml-4 rounded-full border px-3 py-1 text-xs font-medium select-none shrink-0"
                  dateTime={time}
                  style={{
                    backgroundColor: 'var(--secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {time}
                </time>
              </div>
            );
          })}
        </div>

        <div
          className="mt-6 border-t pt-5 text-center"
          style={{ borderColor: 'var(--border)' }}
        >
          <button
            type="button"
            className="inline-flex items-center justify-center space-x-1 font-semibold text-sm transition hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            <span>View All Activity</span>
            <span className="ml-0.5">→</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
