import { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/taskService';
import { Link } from 'react-router-dom';
import type { Task } from '../types/Task';
import TaskList from '../components/TaskList';

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'All' | 'Complete' | 'Incomplete'>('All');

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleToggleStatus = async (task: Task) => {
    await updateTask(task.id, {
      status: task.status === 'Complete' ? 'Incomplete' : 'Complete',
      created_at: new Date().toISOString()
    });
    loadTasks();
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Task List</h2>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <Link to="/add">
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">
        Add Task
          </button>
        </Link>

        <div className="flex items-center gap-2">
          <label className="font-medium text-black">Filter:</label>
          <select
            className="border border-white bg-white px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="All">All</option>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
      </div>

      <TaskList tasks={filteredTasks} onDelete={handleDelete} onToggle={handleToggleStatus} />
    </div>
  );
};

export default Home;