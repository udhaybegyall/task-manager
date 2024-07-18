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

// SET a task's reminder
router.patch('/:id/reminder', async (req: Request, res: Response) => {
  const _req = req as AuthRequest;
  try {
    const task = await Task.findOne({ user: _req.userId, _id: _req.params.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.reminder = {
      time: new Date(req.body.reminderTime),
      isAcknowledged: false,
    };

    const updatedTask = await task.save();
    res.json({ success: true, task: updatedTask });
  } catch (err) {
    console.error('Error setting reminder:', err);
    res.status(400).json({ success: false, message: (err as Error).message });
  }
});

// ACKNOWLEDGE a task's reminder
router.patch('/:id/acknowledge-reminder', async (req: Request, res: Response) => {
  const _req = req as AuthRequest;
  try {
    const task = await Task.findOne({ user: _req.userId, _id: _req.params.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.reminder) {
      task.reminder.isAcknowledged = true;
      // Remove the reminder time to avoid invalid date issues
      task.reminder.time = undefined;
      await task.save();
    }

    res.json(task);
  } catch (err) {
    console.error('Error acknowledging reminder:', err);
    res.status(400).json({ message: (err as Error).message });
  }
});

// GET all tasks with active reminders
router.get('/reminders', async (req: Request, res: Response) => {
  const _req = req as AuthRequest;
  try {
    const tasks: ITask[] = await Task.find({
       user: _req.userId, 
      'reminder.time': { $lte: new Date() }, 
      'reminder.isAcknowledged': false,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

export default router;