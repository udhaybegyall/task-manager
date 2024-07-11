'use client';

import React, { useEffect, useState } from 'react';
import Task from '@/components/task/task';
import useTaskStore from '@/hooks/useTaskStore';
import { useToast } from '@/components/ui/use-toast';

const statusOrder = {
    'To Do': 1,
    'In Progress': 0,
    Done: 2,
};

export default function TaskList() {
    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
    const { tasks, isLoading, error, fetchTasks, deleteTask, filterStatus } =
        useTaskStore();
    const { toast } = useToast();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleDelete = async (id: string) => {
        await deleteTask(id);
        toast({
            title: 'Task deleted',
            description: 'The task has been successfully deleted.',
            variant: 'destructive',
        });
    };

    const handleTaskClick = (taskId: string) => {
        setExpandedTaskId(prevId => (prevId === taskId ? null : taskId));
    };

    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div className='text-red-500'>{error}</div>;
    }

    const filteredTasks =
        filterStatus === 'All'
            ? tasks
            : tasks.filter(task => task.status === filterStatus);

    const sortedTasks = filteredTasks.sort(
        (a, b) => statusOrder[a.status] - statusOrder[b.status]
    );

    return (
        <div className='space-y-4'>
            {sortedTasks.length > 0 ? (
                sortedTasks.map(task => (
                    <Task
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        status={task.status}
                        isExpanded={task._id == expandedTaskId}
                        onClick={() => handleTaskClick(task._id)}
                        description={task.description}
                        onDelete={handleDelete}
                        isDone={task.status === 'Done'}
                    />
                ))
            ) : (
                <div className='mt-10'>
                    <p className='text-center text-muted-foreground'>
                        You don&apos;t have any tasks yet.
                    </p>
                </div>
            )}
        </div>
    );
}