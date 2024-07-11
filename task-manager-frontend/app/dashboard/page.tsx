import withAuth from '@/components/auth/with-auth';
import { Separator } from '@/components/ui/separator';
import AddTaskButton from '@/components/task/add-task-button';
import TaskList from '@/components/task/task-list';
import TaskFilter from '@/components/task/task-filter';

async function DashboardPage() {
    return (
        <div className='mx-auto p-4 max-w-2xl min-h-screen flex flex-col justify-center '>
            <div className='sticky bg-background top-16 z-50'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Your Tasks</h1>
                    <div className='space-x-2 flex w-[30%] items-center'>
                        <AddTaskButton />
                        <TaskFilter />
                    </div>
                </div>
                <Separator className='mb-6' />
            </div>
            <TaskList />
        </div>
    );
}

export default withAuth(DashboardPage);
