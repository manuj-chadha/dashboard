import { useState } from 'react';
import KanbanBoard from '../components/kanban/kanban-board';
import TaskModal from '../components/kanban/task-modal';
import { useLocalStorage } from '../hooks/use-local-storage';
import { initialTasks } from '../lib/dummy-data';

const themeClasses = {
  light: {
    bg: "bg-gradient-to-r from-indigo-50 via-white to-indigo-50",
    text: "text-indigo-900",
  },
  dark: {
    bg: "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800",
    text: "text-white",
  },
  blue: {
    bg: "bg-gradient-to-r from-blue-50 via-white to-blue-50",
    text: "text-blue-900",
  },
  green: {
    bg: "bg-gradient-to-r from-green-50 via-white to-green-50",
    text: "text-green-900",
  },
};

export default function Kanban({ theme = "light" }) {
  const [tasks, setTasks] = useLocalStorage('kanban-tasks', initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoveTask = (taskId, targetColumn) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      let movedTask = null;

      // Find and remove task from current column
      Object.keys(newTasks).forEach(column => {
        const taskIndex = newTasks[column].findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          movedTask = newTasks[column].splice(taskIndex, 1)[0];
        }
      });

      // Add task to target column
      if (movedTask) {
        newTasks[targetColumn].push(movedTask);
      }

      return newTasks;
    });
  };

  const handleEditTask = (taskId) => {
    alert(`Edit task ${taskId} - This would open an edit modal in a real application`);
  };

  const handleDeleteTask = (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach(column => {
          newTasks[column] = newTasks[column].filter(task => task.id !== taskId);
        });
        return newTasks;
      });
    }
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, taskData]
    }));
  };

  return (
    <div className={`min-h-screen p-6 ${themeClasses[theme].bg} ${themeClasses[theme].text}`}>
      <KanbanBoard
        tasks={tasks}
        onMoveTask={handleMoveTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onAddTask={handleAddTask}
        theme={theme} // pass down theme to board for column styling!
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        theme={theme} // optional: if your TaskModal uses theme
      />
    </div>
  );
}
