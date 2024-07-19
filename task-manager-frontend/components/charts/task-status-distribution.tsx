'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { RadialBar, RadialBarChart } from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import useTaskStore from '@/hooks/useTaskStore';

type TaskStatus = 'To Do' | 'In Progress' | 'Done';

const chartConfig: ChartConfig &
    Record<TaskStatus, { label: string; color: string }> = {
    count: {
        label: 'Count',
    },
    'To Do': {
        label: 'To Do',
        color: 'hsl(var(--chart-1))',
    },
    'In Progress': {
        label: 'In Progress',
        color: 'hsl(var(--chart-2))',
    },
    Done: {
        label: 'Done',
        color: 'hsl(var(--chart-3))',
    },
};

export function TaskStatusDistributionChart() {
    const { tasks } = useTaskStore();

    const chartData = React.useMemo(() => {
        const statusCounts = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {} as Record<TaskStatus, number>);

        return Object.entries(statusCounts).map(([status, count]) => ({
            status,
            count,
            fill: chartConfig[status as TaskStatus].color,
        }));
    }, [tasks]);

    console.log(chartData);

    const totalTasks = tasks.length;

    return (
        <Card className='flex flex-col'>
            <CardHeader className='items-center pb-0'>
                <CardTitle>Task Status Distribution</CardTitle>
                <CardDescription>Current Task Status Overview</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
                <ChartContainer
                    config={chartConfig}
                    className='mx-auto aspect-square max-h-[250px]'
                >
                    <RadialBarChart
                        data={chartData}
                        innerRadius={30}
                        outerRadius={110}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    nameKey='status'
                                />
                            }
                        />
                        <RadialBar dataKey='count' background />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2 font-medium leading-none'>
                    Total Tasks: {totalTasks} <TrendingUp className='h-4 w-4' />
                </div>
                <div className='leading-none text-muted-foreground'>
                    Showing distribution of tasks across different statuses
                </div>
            </CardFooter>
        </Card>
    );
}
