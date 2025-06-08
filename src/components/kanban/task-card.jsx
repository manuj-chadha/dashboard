import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

const priorityColors = {
  high: 'destructive',
  medium: 'secondary',
  low: 'default',
};

export default function TaskCard({ task, onDragStart, onEdit, onDelete }) {
  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`
        cursor-move
        transition-shadow duration-200
        border border-transparent
        hover:shadow-lg hover:border-blue-400
        dark:hover:border-blue-600
        dark:bg-gray-800 dark:hover:shadow-blue-900/50
      `}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h5 className="font-medium text-foreground dark:text-gray-100">{task.title}</h5>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task.id)}
              className="h-6 w-6 p-0 text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              <Edit size={12} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
            >
              <Trash2 size={12} />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">{task.description}</p>

        <div className="flex justify-between items-center">
          <Badge variant={priorityColors[task.priority]}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
          <span className="text-xs text-muted-foreground dark:text-gray-400">{task.assignee}</span>
        </div>
      </CardContent>
    </Card>
  );
}
