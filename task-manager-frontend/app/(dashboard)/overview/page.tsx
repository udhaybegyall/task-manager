import { TaskCompletionChart } from '@/components/charts/task-completion';
import { TaskStatusDistributionChart } from '@/components/charts/task-status-distribution';

export default function OverviewPage() {
    return (
        <div className='relative p-4 top-5'>
            <h1 className='text-2xl font-bold mb-4 text-right sm:text-left'>
                Overview
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <TaskStatusDistributionChart />
                <TaskCompletionChart />
            </div>
        </div>
    );
}
