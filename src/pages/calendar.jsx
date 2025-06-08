import { useState } from 'react';
import CalendarGrid from '../components/calendar/calendar-grid';
import EventModal from '../components/calendar/event-modal';
import { useLocalStorage } from '../hooks/use-local-storage';
import { initialEvents } from '../lib/dummy-data';

export default function Calendar() {
  const [events, setEvents] = useLocalStorage('calendar-events', initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedDate('');
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    setEvents(prev => [...prev, eventData]);
  };

  return (
    <div>
      <CalendarGrid
        events={events}
        onDateSelect={handleDateSelect}
        onAddEvent={handleAddEvent}
      />
      
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}
