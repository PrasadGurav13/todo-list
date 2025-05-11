import type { Task } from '../types/Task';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return await res.json();
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to add task');
  return await res.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
};

export const updateTask = async (
  id: number,
  updates: Partial<Omit<Task, 'id'>>
): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return await res.json();
};

export const editTask = async (id: number, task: Omit<Task, 'id'>): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to edit task');
  return await res.json();
};