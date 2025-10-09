import ReusableInfoCard from "@/ui/ReusableInfoCard";

const ProfileOverview = () => {
    return (
        <div>
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
