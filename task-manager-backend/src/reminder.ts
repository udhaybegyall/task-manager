import cron from 'node-cron';
import Task from './models/Task';

export const startReminderSystem = () => {
    cron.schedule('* * * * *', async () => {
        const now = new Date();
        const tasks = await Task.find({
            'reminder.time': { $lte: now },
            'reminder.isAcknowledged': false,
        });

        for (const task of tasks) {
            console.log(`Reminder for task ${task.title}.`);
        }
    });
}