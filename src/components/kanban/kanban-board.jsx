import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaskCard from './task-card';

const columns = {
  todo: { title: 'To Do', border: 'border-blue-300 bg-blue-50' },
  progress: { title: 'In Progress', border: 'border-yellow-300 bg-yellow-50'},
  done: { title: 'Done', border: 'border-green-300 bg-green-50'},
};

export default function KanbanBoard({ tasks, onMoveTask, onEditTask, onDeleteTask, onAddTask }) {
  const onDropTask = (e, col) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData('text/plain');
    onMoveTask(id, col);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Project Board
        </h3>
        <Button
          onClick={onAddTask}
          className="flex items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-md"
        >
          <Plus size={16} className="mr-2" />
          Add Task
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(columns).map(([key, { title, border, darkBg }]) => (
          <Card
            key={key}
            className={`
              rounded-lg shadow-lg flex flex-col max-h-[70vh] overflow-hidden
              ${border} bg-white
              dark:bg-gray-900 dark:border-transparent dark:shadow-md
            `}
          >
            <CardHeader className="bg-opacity-75 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
              <CardTitle className="flex justify-between items-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                {title}
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 select-none">
                  {tasks[key]?.length || 0} task{tasks[key]?.length !== 1 ? 's' : ''}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent
              className="overflow-y-auto px-4 py-3 space-y-4 bg-white dark:bg-gray-900"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDropTask(e, key)}
              style={{ minHeight: '12rem' }}
            >
              {tasks[key]?.length ? (
                tasks[key].map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                ))
              ) : (
                <p className="text-center text-sm text-gray-400 select-none italic">
                  No tasks here yet.
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
