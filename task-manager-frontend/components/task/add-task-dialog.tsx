'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormStatus } from 'react-dom';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useToast } from '@/components/ui/use-toast';
import useTaskStore from '@/hooks/useTaskStore';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type='submit' disabled={pending} className='w-full sm:w-auto'>
            {pending ? 'Adding...' : 'Add Task'}
        </Button>
    );
}

interface AddTaskDialogProps {
    onClose: () => void;
}

export default function AddTaskDialog({ onClose }: AddTaskDialogProps) {
    const { toast } = useToast();
    const { addTask } = useTaskStore();

    async function handleSubmit(formData: FormData) {
        try {
            await addTask(formData);
            toast({
                title: 'Task added successfully',
                description: 'You can now view your tasks in the dashboard.',
            });
            onClose();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Failed to add task',
                description: (error as Error).message,
            });
        }
    }

    return (
        <DialogContent>
            <DialogHeader className='space-y-4'>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription className='text-muted-foreground'>
                    Add a new task to your list.
                </DialogDescription>
            </DialogHeader>
            <form action={handleSubmit} className='space-y-4'>
                <Input name='title' placeholder='Task Title' required />
                <Textarea name='description' placeholder='Task Description' />
                <div className='flex justify-end space-x-2 sm:w-full'>
                    <SubmitButton />
                </div>
            </form>
        </DialogContent>
    );
}
