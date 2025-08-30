import { useEffect } from 'react';
import { supabase } from '@/supabase';
import { useNavigate } from 'react-router';
import { Spinner } from '@/components/ui/spinner';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            // First, let Supabase handle the URL fragment (?code=...)
            const { error } = await supabase.auth.exchangeCodeForSession(
                window.location.href
            );

            if (error) {
                console.error('Error exchanging code:', error.message);
                navigate('/login');
                return;
            }

            // Now check if we actually have a session
            const { data } = await supabase.auth.getSession();

            if (data.session) {
                // User verified + logged in
                navigate('/');
            } else {
                // No session, fallback
                navigate('/login');
            }
        };

        handleCallback();
    }, [navigate]);

    return <Spinner size="lg" variant="ring" />;
};

export default AuthCallback;
