import ProfileContent from '@/features/profile/ProfileContent';
import { useUserAuth } from '@/store/UserAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProfilePage = () => {
    const user = useUserAuth((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);
    const userName = user?.user_metadata.full_name.split(' ')[0];
    console.log(userName);
    return (
        <div className="pt-10">
            <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-6xl font-bold text-transparent">
                Welcome {userName}
            </h2>
            <ProfileContent />
        </div>
    );
}

export default ProfilePage;
