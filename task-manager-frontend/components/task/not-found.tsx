import { PackageOpen } from 'lucide-react';

import useTaskStore from '@/hooks/useTaskStore';

export default function TaskNotFound() {
    const { filterStatus, searchTerm } = useTaskStore();

    let message = 'No tasks found';

    if (searchTerm) {
        message = `No tasks found for "${searchTerm}"`;
    } else {
        switch (filterStatus) {
            case 'To Do':
                message = "You don't have any tasks to do yet.";
                break;
            case 'In Progress':
                message = "You don't have any tasks in progress";
                break;
            case 'Done':
                message = "You haven't completed any tasks yet";
                break;
            default:
                message = "you don't have any tasks";
                break;
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-[calc(100vh-300px)]'>
            <div className='flex items-center justify-center gap-2'>
                <PackageOpen className='h-5 w-5' />
                <h1 className='font-[500]'>No tasks found</h1>
            </div>
            <p className='text-center text-muted-foreground mt-2'>{message}</p>
        </div>
    );
}
