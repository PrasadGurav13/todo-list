import { Router } from 'express';
import { getTasks, addTask, updateTask, deleteTask, editTask, healthCheck } from '../controllers/taskController';

const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks', addTask);
router.put('/tasks/:id', updateTask);
router.patch('/tasks/:id', editTask);
router.delete('/tasks/:id', deleteTask);
router.get('/health', healthCheck);

export default router;