'use client';

import { register } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type='submit' className='w-full' disabled={pending}>
            {pending ? 'Registering...' : 'Register'}
        </Button>
    );
}

export default function RegisterForm() {
    const [error, setError] = useState<string | null>(null);

    async function handleRegister(formData: FormData) {
        setError(null);
        const result = await register(formData);
        if (result && result.error) {
            setError(result.error);
        }
    }

    return (
        <form action={handleRegister} className='space-y-8'>
            {error && <p className='text-red-500'>{error}</p>}
            <div className='space-y-4'>
                <Input
                    type='text'
                    name='username'
                    placeholder='Username'
                    required
                />
                <Input type='email' name='email' placeholder='Email' required />
                <Input
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                />
            </div>

            <SubmitButton />
        </form>
    );
}
