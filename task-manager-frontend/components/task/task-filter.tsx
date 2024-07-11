'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useTaskStore from '@/hooks/useTaskStore';

export default function TaskFilter() {
    const setFilterStatus = useTaskStore(state => state.setFilterStatus);

    const handleChange = (value: string) => {
        setFilterStatus(value);
    };

    return (
        <Select name='status' defaultValue='All' onValueChange={handleChange}>
            <SelectTrigger>
                <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='All'>All</SelectItem>
                <SelectItem value='To Do'>To Do</SelectItem>
                <SelectItem value='In Progress'>In Progress</SelectItem>
                <SelectItem value='Done'>Done</SelectItem>
            </SelectContent>
        </Select>
    );
}
