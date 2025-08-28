import { useEffect } from 'react';
import { supabase } from '@/supabase';
import { useNavigate } from 'react-router';
import { Spinner } from '@/components/ui/spinner';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                // user is verified and logged in
                navigate('/');
            } else {
                navigate('/login');
            }
        });
    }, []);

    return <Spinner size="lg" variant="ring" />;
};

export default AuthCallback;
