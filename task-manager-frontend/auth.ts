import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { API_BASE_URL } from './config';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            accessToken: string;
        } & DefaultSession['user'];
    }

    interface User {
        id?: string;
        accessToken: string;
    }

    interface JWT extends DefaultJWT {
        id: string;
        accessToken: string;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },

            authorize: async credentials => {
                if (!credentials.email || !credentials.password) {
                    throw new Error('Invalid credentials');
                }

                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                    headers: { 'content-type': 'application/json' },
                });

                const data = await response.json();

                if (response.ok && data.token) {
                    return {
                        id: data.userId,
                        email: data.email,
                        accessToken: data.token,
                    };
                } else {
                    throw new Error('Invalid credentials');
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        session({ session, token }) {
            if (token) {
                session.user.accessToken = token.accessToken as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    debug: process.env.NODE_ENV === 'development',
});
