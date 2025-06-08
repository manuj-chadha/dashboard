import { useTheme } from '../../contexts/theme-context.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Check } from 'lucide-react';

export default function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette size={20} />
          <span>Theme Selector</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((themeOption) => {
            const isActive = theme === themeOption.value;

            return (
              <div
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isActive ? 'shadow-md' : 'hover:border-primary/50'
                }`}
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{themeOption.label}</span>
                  {isActive && <Check size={16} style={{ color: 'var(--primary)' }} />}
                </div>
                <div className="flex space-x-1">
                  {/* Accent color circle */}
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `var(--primary)` }}
                  ></div>
                  {/* Muted and secondary colors */}
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: 'var(--muted)' }}
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: 'var(--secondary)' }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="mt-4 p-3 rounded-lg"
          style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
        >
          <p className="text-sm">
            Current theme:{' '}
            <span style={{ color: 'var(--foreground)', fontWeight: '600' }}>
              {themes.find((t) => t.value === theme)?.label}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
