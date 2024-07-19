'use client';

import { Input } from '@/components/ui/input';
import useTaskStore from '@/hooks/useTaskStore';
import { Search } from 'lucide-react';

export default function TaskSearch() {
    const { setSearchTerm } = useTaskStore();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='relative w-full md:w-[500px] mb-2 md:mb-0'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4' />
            <Input
                className='pl-10 w-full'
                placeholder='Search tasks'
                onChange={handleSearch}
            />
        </div>
    );
}
