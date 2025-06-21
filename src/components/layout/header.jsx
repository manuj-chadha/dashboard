import { Menu, Bell, Settings, User, LogOut, Palette, Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/theme-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header({ onMenuClick }) {
  const { theme, setTheme, themes } = useTheme();
  // const {theme, setTheme} = useTheme();
    const isDark= theme === "dark";

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 sm:gap-6 shadow-sm"
      role="banner"
    >
      {/* Left side */}
      <div className="flex items-center space-x-1 sm:space-x-6 flex-grow sm:flex-grow-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Open menu"
          type="button"
        >
          <Menu size={24} />
        </button>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-200 truncate">
            Dashboard Overview
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">Welcome back, Celebal!</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-0 sm:space-x-6 flex-nowrap md:flex-wrap justify-end">
        {/* Theme selector */}
        <div className={`cursor-pointer transition-transform duration-700 ${isDark ? "rotate-180" : "rotate-0"}`} onClick={() => setTheme(isDark ? "light": "dark")}>
            {isDark ? <Sun className="w-6 h-6 text-yellow-400 rotate-0 transition-all" /> 
            : <Moon className="w-6 h-6 text-blue-400 rotate-0 transition-all" />}
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Notifications"
            type="button"
          >
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs shadow-md"
            >
              3
            </Badge>
          </Button>
        </div>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="User menu"
              type="button"
            >
              <img
                src="./celebal.jpeg"
                alt="Profile avatar"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-blue-300 shadow-sm object-cover"
                loading="lazy"
              />
              <div className="hidden sm:flex flex-col text-left select-none">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Celebal Tech</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Administrator</span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          >
            <DropdownMenuLabel className="text-sm font-semibold text-gray-500 dark:text-gray-400 select-none">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-blue-50 dark:hover:bg-blue-900 focus:bg-blue-100 dark:focus:bg-blue-800 flex items-center space-x-2">
              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50 dark:hover:bg-blue-900 focus:bg-blue-100 dark:focus:bg-blue-800 flex items-center space-x-2">
              <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 focus:bg-red-100 dark:focus:bg-red-800 flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
