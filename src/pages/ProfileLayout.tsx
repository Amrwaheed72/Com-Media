import { lazy } from 'react';
import { Outlet } from 'react-router';

const ProfileSidebar = lazy(() => import('@/ui/ProfileSidebar'));

const ProfileLayout = () => {
    return (
        <div className="h-full w-full">
            <ProfileSidebar />
            <main className="mx-auto ml-18 sm:ml-34">
                <Outlet />
            </main>
        </div>
    );
};

export default ProfileLayout;
