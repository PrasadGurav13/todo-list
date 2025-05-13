import { Link } from 'react-router-dom';
import type { Task } from '../types/Task';

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (task: Task) => void;
}

const TaskList = ({ tasks, onDelete, onToggle }: Props) => {
  if (!tasks.length) return <p>No tasks available.</p>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {tasks.map((task)=> (
        <div key={task.id} className={`${task.status === 'Complete' ? 'bg-green-100' : 'bg-white'} p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between h-full`}>
          <span className={`text-xl mb-4 text-gray-800 ${task.status === 'Complete' ? 'line-through' : ''}`}>
            {task.title}
          </span>
          <div className="flex items-center justify-between mt-auto">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={task.status === 'Complete'}
              onChange={() => onToggle(task)}
              className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
          </label>
          <div className="flex gap-2">
          <Link to={`/edit/${task.id}`}>
              <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition text-sm">
                Edit
              </button>
            </Link>
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              onClick={() => onDelete(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m5 0H6"
                />
              </svg>
            </button>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};  

export default TaskList;
