import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <nav className='flex items-center justify-between fixed top-1 left-1 right-1 bg-background h-16 px-4 sm:px-6 lg:px-8 z-50'>
                <div className='text-2xl'>Doit.</div>
                <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >
                    <Button type='submit' variant='outline'>
                        Sign out
                    </Button>
                </form>
            </nav>
            {children}
        </>
    );
}
