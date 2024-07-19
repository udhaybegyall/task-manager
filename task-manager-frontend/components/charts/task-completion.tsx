'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import useTaskStore from '@/hooks/useTaskStore';

export function TaskCompletionChart() {
    const { tasks } = useTaskStore();

    const completedTasks = tasks.filter(task => task.status === 'Done').length;
    const totalTasks = tasks.length;
    const completionRate =
        totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const chartData = [
        {
            name: 'Completed',
            value: completionRate,
            fill: 'hsl(var(--chart-2))',
        },
    ];

    const chartConfig = {
        Completed: {
            label: 'Completed Tasks',
            color: 'hsl(var(--chart-2))',
        },
    } as ChartConfig;

    return (
        <Card className='flex flex-col'>
            <CardHeader className='items-center pb-0'>
                <CardTitle>Task Completion Rate</CardTitle>
                <CardDescription>Current Progress</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
                <ChartContainer
                    config={chartConfig}
                    className='mx-auto aspect-square max-h-[250px]'
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={360 * (completionRate / 100)}
                        innerRadius={80}
                        outerRadius={110}
                    >
                        <PolarGrid
                            gridType='circle'
                            radialLines={false}
                            stroke='none'
                            className='first:fill-muted last:fill-background'
                            polarRadius={[86, 74]}
                        />
                        <RadialBar
                            dataKey='value'
                            background
                            cornerRadius={10}
                        />
                        <PolarRadiusAxis
                            tick={false}
                            tickLine={false}
                            axisLine={false}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor='middle'
                                                dominantBaseline='middle'
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className='fill-foreground text-4xl font-bold'
                                                >
                                                    {completionRate.toFixed(1)}%
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className='fill-muted-foreground'
                                                >
                                                    Completed
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2 font-medium leading-none'>
                    {completedTasks} out of {totalTasks} tasks completed
                    {completionRate > 50 ? (
                        <TrendingUp className='h-4 w-4 text-green-500' />
                    ) : (
                        <TrendingDown className='h-4 w-4 text-red-500' />
                    )}
                </div>
                <div className='leading-none text-muted-foreground'>
                    Keep up the good work!
                </div>
            </CardFooter>
        </Card>
    );
}
