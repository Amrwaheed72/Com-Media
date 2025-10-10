import { useUserAuth } from '@/store/UserAuth';
import ReusableInfoCard from '@/ui/ReusableInfoCard';

const ProfileOverview = () => {
    const user = useUserAuth((state) => state.user);
    return (
        <div>
            <div>
                <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent">
                    Profile overview
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <ReusableInfoCard title="Your Posts Count" content="3" />
                <ReusableInfoCard title="Your Posts Count" content="3" />
                <ReusableInfoCard title="Your Posts Count" content="3" />
                <ReusableInfoCard title="Your Posts Count" content="3" />
            </div>{' '}
        </div>
    );
};

export default ProfileOverview;
