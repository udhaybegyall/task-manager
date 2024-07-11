'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddTaskDialog from '@/components/task/add-task-dialog';

export default function AddTaskButton() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size='icon' className='w-[30%]'>
                    <Plus className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <AddTaskDialog onClose={() => setIsOpen(false)} />
        </Dialog>
    );
}
