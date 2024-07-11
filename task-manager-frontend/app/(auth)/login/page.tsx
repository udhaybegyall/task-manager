import { auth } from '@/auth';
import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const session = await auth();

    if (session) {
        return redirect('/dashboard');
    }

    return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-sm w-full space-y-8'>
                <h2 className='mt-6 text-3xl font-[500] tracking-wide'>
                    Login to Doit.
                </h2>
                <p className='text-lg text-muted-foreground tracking-wide font-[500]'>
                    Mange you tasks with ease,
                    <br /> and never miss a deadline.
                </p>
                <LoginForm />

                <p className='mt-6 text-center text-muted-foreground underline'>
                    Don&apos;t have an account?{' '}
                    <Link href='/register'>Sign up</Link>
                </p>
            </div>
        </div>
    );
}
