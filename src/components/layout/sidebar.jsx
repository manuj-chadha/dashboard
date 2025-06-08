import { Link, useLocation } from "wouter";
import { Home, Table, BarChart3, Calendar, Columns, X, Activity } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard", description: "Overview & metrics" },
  { icon: Table, label: "Tables", path: "/tables", description: "User management" },
  { icon: BarChart3, label: "Charts", path: "/charts", description: "Data visualization" },
  { icon: Calendar, label: "Calendar", path: "/calendar", description: "Event scheduling" },
  { icon: Columns, label: "Kanban", path: "/kanban", description: "Task management" },
];

export default function Sidebar({ isOpen, onClose }) {
  const [location] = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(var(--overlay-rgb), 0.4)' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 
          w-56 sm:w-64 
          shadow-lg z-[100]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          rounded-r-lg
          flex flex-col
          border-r
        `}
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          borderColor: 'var(--border)',
          color: 'var(--sidebar-foreground)',
        }}
        aria-label="Sidebar navigation"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-md"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <img src="./public/celebal.jpeg" alt="no" className="rounded-full" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl" style={{ color: 'var(--foreground)' }}>
                Celebal Tech
              </h1>
              <p className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-[var(--hover-bg)] focus:outline-none focus:ring-2"
            style={{ 
              color: 'var(--foreground)',
              '--tw-ring-color': 'var(--primary)'
            }}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-3 sm:p-4 space-y-3 overflow-y-auto">
          {menuItems.map(({ icon: Icon, label, path, description }) => {
            const isActive = location === path || (location === "/" && path === "/dashboard");

            return (
              <Link key={path} href={path}>
                <a
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose?.();
                  }}
                  className={`
                    flex items-center space-x-4 px-4 py-3 rounded-lg cursor-pointer
                    transition-colors duration-200 group
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    focus:ring-[var(--primary)]
                    ${isActive ? 'bg-[var(--primary)] shadow-[var(--shadow)] text-[var(--primary-foreground)]' : 
                      'text-[var(--sidebar-foreground)] hover:bg-[var(--hover-bg)] hover:text-[var(--primary)]'}
                  `}
                  tabIndex={0}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    size={22}
                    className="transition-colors duration-200"
                    style={{
                      color: isActive ? 'var(--primary-foreground)' : 'var(--sidebar-icon)',
                    }}
                  />
                  <div className="flex flex-col leading-tight">
                    <span
                      className="font-semibold text-sm"
                      style={{
                        color: isActive ? 'var(--primary-foreground)' : 'var(--sidebar-foreground)',
                      }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        color: isActive ? 'var(--primary-muted)' : 'var(--sidebar-muted)',
                      }}
                    >
                      {description}
                    </span>
                  </div>
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <footer
          className="p-4 text-center text-xs mt-auto"
          style={{ color: 'var(--sidebar-muted)', borderTop: '1px solid var(--border)' }}
        >
          &copy; {new Date().getFullYear()} Celebal Tech. All rights reserved.
        </footer>
      </aside>
    </>
  );
}
