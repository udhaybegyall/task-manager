'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

import useTaskStore from '@/hooks/useTaskStore';

interface ReminderPopoverProps {
    id: string;
}

export default function ReminderPopover({ id }: ReminderPopoverProps) {
    const { setReminder } = useTaskStore();

    const handleSetReminder = (minutes: number) => {
        const reminderTime = new Date(Date.now() + minutes * 60000);
        setReminder(id, reminderTime);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={(e: any) => e.stopPropagation()}
                >
                    <Bell className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='grid grid-cols-2 gap-2'>
                    <Button onClick={() => handleSetReminder(1)}>1 min</Button>
                    <Button onClick={() => handleSetReminder(60)}>1 hr</Button>
                    <Button onClick={() => handleSetReminder(10080)}>
                        1 week
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
