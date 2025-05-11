import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editTask } from '../services/taskService';
import { getTasks } from '../services/taskService';
import type { Task } from '../types/Task';

const EditTask = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'Complete' | 'Incomplete'>('Incomplete');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const allTasks = await getTasks();
      const found = allTasks.find((t) => t.id === Number(id));
      if (found) {
        setTask(found);
        setTitle(found.title);
        setStatus(found.status as 'Complete' | 'Incomplete');
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await editTask(Number(id), { title, status, created_at: new Date().toISOString() });
      navigate('/');
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">Edit Task</h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Task title"
          />
  
          <label className="inline-flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              checked={status === 'Complete'}
              onChange={(e) => setStatus(e.target.checked ? 'Complete' : 'Incomplete')}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span>Mark as Complete</span>
          </label>
  
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );  
};

export default EditTask;
