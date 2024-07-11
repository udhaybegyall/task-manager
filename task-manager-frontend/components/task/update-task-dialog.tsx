import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFormStatus } from 'react-dom';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useToast } from '@/components/ui/use-toast';
import useTaskStore from '@/hooks/useTaskStore';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type='submit' disabled={pending} className='w-full sm:w-auto'>
            {pending ? 'Updating...' : 'Update Task'}
        </Button>
    );
}

interface UpdateTaskDialogProps {
    onClose: () => void;
    taskId: string;
    initialTitle: string;
    initialDescription: string;
    initialStatus: 'To Do' | 'In Progress' | 'Done';
}

export default function UpdateTaskDialog({
    onClose,
    taskId,
    initialTitle,
    initialDescription,
    initialStatus,
}: UpdateTaskDialogProps) {
    const { toast } = useToast();
    const { updateTask } = useTaskStore();

    async function handleSubmit(formData: FormData) {
        try {
            await updateTask(taskId, formData);
            toast({
                title: 'Task updated successfully',
                description: 'Your task has been updated.',
            });
            onClose();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Failed to update task',
                description: (error as Error).message,
            });
        }
    }

    return (
        <DialogContent>
            <DialogHeader className='space-y-4'>
                <DialogTitle>Update Task</DialogTitle>
                <DialogDescription className='text-muted-foreground'>
                    Update your task details.
                </DialogDescription>
            </DialogHeader>
            <form action={handleSubmit} className='space-y-4'>
                <Input
                    name='title'
                    placeholder='Task Title'
                    required
                    defaultValue={initialTitle}
                />
                <Textarea
                    name='description'
                    placeholder='Task Description'
                    defaultValue={initialDescription}
                />
                <Select name='status' defaultValue={initialStatus}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select a status' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='To Do'>To Do</SelectItem>
                        <SelectItem value='In Progress'>In Progress</SelectItem>
                        <SelectItem value='Done'>Done</SelectItem>
                    </SelectContent>
                </Select>
                <div className='flex justify-end space-x-2 sm:w-full'>
                    <SubmitButton />
                </div>
            </form>
        </DialogContent>
    );
}
