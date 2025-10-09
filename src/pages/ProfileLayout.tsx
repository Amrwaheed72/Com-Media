import ProfileSidebar from '@/ui/ProfileSidebar';
import { Outlet } from 'react-router';

const ProfileLayout = () => {
    return (
        <div className="h-full w-full">
            <ProfileSidebar />
            <main className="ml-32">
                <Outlet />
            </main>
        </div>
    );
};

export default ProfileLayout;
