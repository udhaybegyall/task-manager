'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import UpdateTaskDialog from '@/components/task/update-task-dialog';

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
    const taskRef = useRef<HTMLDivElement>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    // Utility function to truncate the description if it exceeds a certain length
    // To Do: Move to utility file
    const truncateDescription = (text: string, maxLength: number) => {
        if (text?.length <= maxLength) return text;
        return text?.slice(0, maxLength) + '...';
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(id);
        } else {
            console.error('onDelete function not provided');
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsUpdateDialogOpen(true);
    };

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
                    className={`p-4 border rounded-md shadow-sm bg-background transition-all duration-300 ease-in-out ${
                        isExpanded ? 'w-[80%]' : 'w-full'
                    }`}
                >
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
                    <p
                        className={`text-sm mt-2 ${
                            status === 'In Progress'
                                ? 'text-green-500'
                                : 'text-muted-foreground'
                        }`}
                    >
                        Status: {status}
                    </p>
                </div>
                <div
                    className={`flex transition-all duration-300 ease-in-out ${
                        isExpanded ? 'w-[20%]' : 'hidden'
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
            <Dialog
                open={isUpdateDialogOpen}
                onOpenChange={setIsUpdateDialogOpen}
            >
                <UpdateTaskDialog
                    taskId={id}
                    initialTitle={title}
                    initialDescription={description}
                    initialStatus={status}
                    onClose={() => setIsUpdateDialogOpen(false)}
                />
            </Dialog>
        </>
    );
}
