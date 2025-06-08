import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function CalendarGrid({ events, onDateSelect, onAddEvent }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const calendarDays = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    calendarDays.push(date);
  }

  const changeMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === month;
  };

  const formatDateLocal = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDateLocal(date);
    return events.filter((event) => event.date === dateStr);
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className="shadow-lg rounded-xl
      bg-gradient-to-br from-white/70 to-blue-50 backdrop-blur-md border border-blue-200
      dark:from-gray-900/70 dark:to-gray-800 dark:border-gray-700
      w-full
    ">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 w-full">
          <h3 className="text-2xl font-extrabold
            text-blue-900 dark:text-blue-300
            flex items-center gap-2"
          >
            📅 Calendar
          </h3>

          <div className="flex flex-wrap sm:flex-nowrap items-center space-x-3 space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <div className="flex items-center space-x-3 flex-grow sm:flex-grow-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => changeMonth(-1)}
                className="text-blue-600 border-blue-300 hover:bg-blue-100
                  dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-900
                "
              >
                <ChevronLeft size={18} />
              </Button>
              <span className="px-5 py-2 font-semibold text-center text-lg
                text-blue-900 dark:text-blue-300 select-none whitespace-nowrap"
              >
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  year: 'numeric',
                }).format(currentDate)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => changeMonth(1)}
                className="text-blue-800 border-blue-300 hover:bg-blue-100
                  dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-900
                "
              >
                <ChevronRight size={18} />
              </Button>
            </div>

            <Button
              onClick={onAddEvent}
              className="flex items-center gap-2 bg-blue-800 text-white hover:bg-blue-900 w-full sm:w-auto justify-center
                dark:bg-blue-700 dark:hover:bg-blue-800
              "
            >
              <Plus size={16} />
              Add Event
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className="p-4 sm:p-6 bg-white/80 rounded-xl shadow-inner
          dark:bg-gray-900/80
        "
      >
        {/* Weekday Headers */}
        <div
          className="grid grid-cols-7 gap-px mb-4 rounded overflow-hidden text-xs sm:text-sm
            dark:text-gray-300
          "
        >
          {dayNames.map((day, idx) => (
            <div
              key={day}
              className={`p-2 sm:p-3 text-center font-semibold tracking-wide select-none
                ${
                  idx === 0
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400'
                    : idx === 6
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400'
                    : 'bg-blue-50 text-blue-800 dark:bg-gray-800 dark:text-gray-300'
                }
              `}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates Grid */}
        <div
          className="
            grid grid-cols-7 gap-px
            sm:gap-1
            rounded
            auto-rows-[minmax(80px,auto)]
            sm:auto-rows-[minmax(100px,auto)]
          "
        >
          {calendarDays.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const outOfMonth = !isCurrentMonth(date);
            const today = isToday(date);

            return (
              <div
                key={index}
                onClick={() => onDateSelect(formatDateLocal(date))}
                className={`
                  cursor-pointer flex flex-col
                  rounded-lg border
                  p-2 sm:p-3
                  transition-all duration-300 ease-in-out
                  ${
                    today
                      ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-400/50 border-blue-600 dark:shadow-blue-900/80 dark:from-blue-600 dark:to-blue-800 dark:border-blue-800'
                      : outOfMonth
                      ? 'bg-blue-50 text-blue-300 border-blue-100 cursor-default dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700'
                      : 'bg-white text-blue-900 border-blue-200 hover:bg-blue-100 dark:bg-gray-900 dark:text-blue-300 dark:border-gray-700 dark:hover:bg-gray-800'
                  }
                `}
                title={`${date.toDateString()}${dayEvents.length ? ` - ${dayEvents.length} event(s)` : ''}`}
              >
                {/* Date Number */}
                <div
                  className={`text-sm sm:text-lg font-semibold select-none ${
                    today ? 'text-white' : outOfMonth ? 'text-blue-300 dark:text-gray-600' : 'text-blue-800 dark:text-blue-300'
                  }`}
                >
                  {date.getDate()}
                </div>

                {/* Events */}
                <div className="mt-1 sm:mt-2 space-y-1 overflow-y-auto max-h-16 sm:max-h-20">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-[10px] sm:text-xs font-semibold rounded-full px-1.5 sm:px-2 py-0.5 truncate
                        bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
                        text-white shadow-md shadow-pink-300/40"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
