'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Bell } from 'lucide-react';

import UpdateTaskButton from './update-task-button';
import { truncateDescription } from '@/lib/utils';
import ReminderPopover from './reminder-popover';

interface TaskProps {
    id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
    isExpanded: boolean;
    onClick: () => void;
    onDelete: (id: string) => Promise<any>;
    isDone: boolean;
}

export default function Task({
    id,
    title,
    description,
    status,
    isExpanded,
    onClick,
    onDelete,
    isDone,
}: TaskProps) {
    const [taskHeight, setTaskHeight] = useState(0);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const taskRef = useRef<HTMLDivElement>(null);

    // callback function for deleting a task
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(id);
        } else {
            console.error('onDelete function not provided');
        }
    };

    // toggle the update dialog
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsUpdateDialogOpen(true);
    };

    // calculate the height of the task
    useEffect(() => {
        if (taskRef.current) {
            setTaskHeight(taskRef.current.offsetHeight);
        }
    }, [isExpanded]);

    return (
        <>
            <div
                className='flex items-center transition-all duration-300 ease-in-out cursor-pointer'
                onClick={onClick}
            >
                <div
                    ref={taskRef}
                    className={`flex justify-between p-4 border rounded-md shadow-sm bg-background transition-all duration-300 ease-in-out ${
                        isExpanded ? 'w-[70%] md:w-[80%]' : 'w-full'
                    }`}
                >
                    <div>
                        <h3
                            className={`${
                                isDone
                                    ? 'line-through text-muted-foreground'
                                    : 'text-primary'
                            }`}
                        >
                            {title}
                        </h3>
                        <p className='text-muted-foreground text-sm'>
                            {isExpanded
                                ? description
                                : truncateDescription(description, 50)}
                        </p>
                        <p className='text-sm mt-2 text-muted-foreground'>
                            Status:{' '}
                            <span
                                className={`${
                                    status === 'In Progress'
                                        ? 'text-green-500'
                                        : status === 'To Do'
                                        ? 'text-red-500'
                                        : ''
                                }`}
                            >
                                {status}
                            </span>
                        </p>
                    </div>
                    <ReminderPopover id={id} />
                </div>
                <div
                    className={`flex transition-all duration-300 ease-in-out ${
                        isExpanded ? 'w-[30%] md:w-[20%]' : 'hidden'
                    }`}
                    style={{ height: `${taskHeight}px` }}
                >
                    <Button
                        variant='secondary'
                        className='h-full w-full ml-[5%] mr-[5%]'
                        onClick={handleEdit}
                    >
                        <Edit className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='destructive'
                        className='h-full w-full'
                        onClick={handleDelete}
                    >
                        <Trash2 className='h-4 w-4' />
                    </Button>
                </div>
            </div>
            <UpdateTaskButton
                isUpdateDialogOpen={isUpdateDialogOpen}
                setIsUpdateDialogOpen={setIsUpdateDialogOpen}
                id={id}
                title={title}
                description={description}
                status={status}
            />
        </>
    );
}
