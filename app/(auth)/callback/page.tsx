import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';

export default function Callback() {
    const router = useRouter();
    const { token } = router.query;
    const { data: session } = useSession();

    useEffect(() => {
        if (token) {
        // Store token in localStorage or context
        localStorage.setItem('auth_token', token as string);
        router.push('/dashboard'); // Redirect to your protected route
        }
    }, [token, router]);

    return <div>Loading...</div>;
}