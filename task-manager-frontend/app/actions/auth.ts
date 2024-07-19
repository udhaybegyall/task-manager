'use server';

import { signIn, signOut } from '@/auth';
import { API_BASE_URL } from '@/config';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    try {
        await signIn('credentials', {
            redirect: false,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        });

        redirect('/tasks');
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid email or password' };
                case 'CallbackRouteError':
                    return { error: 'There was a problem with the server' };
                default:
                    return { error: 'Something went wrong' };
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut();
}

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export async function register(formData: FormData) {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const registerData: RegisterData = {
        username,
        email,
        password,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: { 'content-type': 'application/json' },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        return { error: 'An unexpected error occurred' };
    } finally {
        redirect('/login');
    }
}
