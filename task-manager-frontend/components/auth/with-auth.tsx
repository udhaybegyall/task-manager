import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default function withAuth(Component: React.ComponentType) {
    return async function AuthenticatedComponent(props: any) {
        const session = await auth();

        if (!session) {
            redirect('/login');
        }

        return <Component {...props} />;
    };
}
