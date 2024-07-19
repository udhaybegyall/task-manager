'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/actions/auth';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
    const [isPending, startTransition] = useTransition();

    const handleSignOut = () => {
        startTransition(async () => {
            await logout();
        });
    };

    return (
        <Button
            onClick={handleSignOut}
            disabled={isPending}
            variant={'ghost'}
            className='w-full flex justify-start font-normal m-0 p-0 h-5'
        >
            <LogOut className='mr-2 h-4 w-4' />
            {isPending ? 'Signing out...' : 'Sign out'}
        </Button>
    );
}
