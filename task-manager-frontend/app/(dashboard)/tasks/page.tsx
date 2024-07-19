import withAuth from '@/components/auth/with-auth';

import TaskList from '@/components/task/task-list';
import TaskFilter from '@/components/task/task-filter';
import TaskSearch from '@/components/task/task-search';
import AddTaskButton from '@/components/task/add-task-button';

import { Separator } from '@/components/ui/separator';

import ActiveRemindersWrapper from './active-reminders-wrapper';

async function DashboardPage() {
    return (
        <div className='p-4 mx-auto'>
            <div className='sticky top-0 bg-background z-40'>
                <div className='pt-4'>
                    <div className='flex justify-end mb-6'>
                        <ActiveRemindersWrapper />
                    </div>
                    <Separator className='mb-6' />
                    <div className='flex flex-col md:flex-row justify-between mb-4 md:mb-6'>
                        <TaskSearch />
                        <div className='flex flex-reverse md:flex-row space-x-2 md:space-x-2 w-full md:w-[200px] items-center'>
                            <TaskFilter />
                            <AddTaskButton />
                        </div>
                    </div>
                </div>
                <div className='h-4 bg-background'></div> {/* spacer */}
            </div>
            <TaskList />
        </div>
    );
}

export default withAuth(DashboardPage);
