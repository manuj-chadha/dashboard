import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function EventModal({ isOpen, onClose, onSave, selectedDate }) {
  const [formData, setFormData] = useState({
    title: '',
    date: selectedDate || '',
    description: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        date: selectedDate || '',
        description: ''
      });
    }
  }, [isOpen, selectedDate]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventDate = formData.date || selectedDate;

    if (formData.title && eventDate) {
      onSave({
        id: Date.now(),
        title: formData.title,
        date: eventDate,
        description: formData.description
      });
      setFormData({ title: '', date: '', description: '' });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          sm:max-w-md
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          shadow-xl
          rounded-xl
          backdrop-blur-sm
          text-gray-900 dark:text-gray-100
        "
      >
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
