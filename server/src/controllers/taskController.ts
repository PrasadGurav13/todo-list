import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
};

export const addTask = async (req: Request, res: Response) => {
  const { title, status } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        status: status || 'Incomplete',
      },
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const updated = await prisma.task.update({
    where: { id: Number(id) },
    data: { status },
  });

  res.json(updated);
};

export const editTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, status } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, status },
    });

    res.json(updatedTask);

};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.task.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};

export const healthCheck = async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`; // simple query to test connection
    res.json({ status: 'Database connected' });
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ status: 'Database not connected' });
  }
};