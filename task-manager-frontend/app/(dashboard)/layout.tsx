import { signOut } from '@/auth';
import Sidebar from '@/components/sidebar';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <>
        //     <nav className='flex items-center justify-between fixed top-1 left-1 right-1 bg-background h-16 px-4 sm:px-6 lg:px-8 z-50'>
        //         <div className='text-2xl'>Doit.</div>
        //         <form
        //             action={async () => {
        //                 'use server';
        //                 await signOut();
        //             }}
        //         >
        //             <Button type='submit' variant='outline'>
        //                 Sign out
        //             </Button>
        //         </form>
        //     </nav>
        //     {children}
        // </>
        <div className='flex h-screen bg-background'>
            <Sidebar />
            <div className='flex-1 flex flex-col overflow-hidden md:ml-20'>
                <main className='flex-1 overflow-x-hidden overflow-y-auto'>
                    {children}
                </main>
            </div>
        </div>
    );
}
