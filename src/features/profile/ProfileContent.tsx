import { useUserAuth } from '@/store/UserAuth';
import ReusableInfoCard from '@/ui/ReusableInfoCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProfileContent = () => {
    const user = useUserAuth((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);
    const userName = user?.user_metadata.full_name.split(' ')[0];
    console.log(user);
    return (
        <div>
            <div>
                <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent">
                    Welcome, {userName} 👋
                </h2>
            </div>
        </div>
    );
};

export default ProfileContent;
