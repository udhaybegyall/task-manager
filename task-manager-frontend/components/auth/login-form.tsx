'use client';

import { login } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('test027');

    return (
        <form action={login} className='space-y-8'>
            <div className='space-y-4'>
                <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='password'
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <Button type='submit' className='w-full'>
                Sign in
            </Button>
        </form>
    );
}
