import express, { Request, Response, Router } from 'express';
import Task, { ITask } from '../models/Task';
import { validateTask } from '../middleware/validateTask';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

// GET all the tasks
router.get('/', async (req: Request, res: Response) => {
  const _req = req as AuthRequest;
  try {
    const tasks: ITask[] = await Task.find({ user: _req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

// POST a new task
router.post('/', validateTask, async (req: Request, res: Response) => {
  const _req = req as AuthRequest;
  const task = new Task({
    title: _req.body.title,
    description: _req.body.description,
    status: _req.body.status,
    user: _req.userId,
  });

  try {
    const newTask: ITask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

// UPDATE a task
router.put('/:id', validateTask, async (req: Request, res: Response) => {
  const _req = req as AuthRequest;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      _req.params.id,
      {
        title: _req.body.title,
        description: _req.body.description,
        status: _req.body.status,
      },
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

// DELETE a task
router.delete('/:id', async (req: Request, res: Response) => {
  const _req = req as AuthRequest;
  try {
    const deletedTask = await Task.findByIdAndDelete(_req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(deletedTask);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

export default router;