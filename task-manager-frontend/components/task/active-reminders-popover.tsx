'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { BellDot, Check } from 'lucide-react';
import useTaskStore from '@/hooks/useTaskStore';
import { useEffect } from 'react';

export default function ActiveRemindersPopover() {
    const { activeReminders, fetchActiveReminders, acknowledgeReminder } =
        useTaskStore();

    useEffect(() => {
        fetchActiveReminders();
        const interval = setInterval(fetchActiveReminders, 60000);
        return () => clearInterval(interval);
    }, [fetchActiveReminders]);

    const handleAcknowledgeReminder = (id: string) => {
        acknowledgeReminder(id);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className='space-x-2 flex items-center rounded-[20px]'
                >
                    <BellDot className='h-4 w-4' />
                    <p>Reminder</p>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div>
                    <h3 className='font-semibold mb-2'>Active Reminders</h3>
                    {activeReminders.length === 0 ? (
                        <p className='text-sm text-muted-foreground'>
                            No active reminders.
                        </p>
                    ) : (
                        activeReminders.map(task => (
                            <div key={task._id}>
                                <div className='flex items-center justify-between border-b border-border py-2'>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>
                                            {task.title}
                                        </p>
                                        <p>
                                            {task.reminder &&
                                                task.reminder.time && (
                                                    <span className='text-xs text-[#656565]'>
                                                        {new Date(
                                                            task.reminder.time
                                                        ).toLocaleString()}
                                                    </span>
                                                )}
                                        </p>
                                    </div>
                                    <Button
                                        className='rounded-full h-8 w-8 p-2'
                                        variant='outline'
                                        size='sm'
                                        onClick={() =>
                                            handleAcknowledgeReminder(task._id)
                                        }
                                    >
                                        <Check className='w-4 h-4' />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
