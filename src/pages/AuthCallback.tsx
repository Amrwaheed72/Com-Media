import { useEffect } from 'react';
import { supabase } from '@/supabase';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleVerify = async () => {
            // Exchange the code from the email link
            const { error } = await supabase.auth.exchangeCodeForSession(
                window.location.href
            );

            if (error) {
                console.error('Email verification error:', error.message);
                navigate('/login');
                return;
            }

            // After success, user is logged in automatically
            navigate('/');
        };

        handleVerify();
    }, [navigate]);

    return (
        <div className="flex h-screen items-center justify-center">
            <Spinner size="lg" variant="ring" />
        </div>
    );
};

export default AuthCallback;
