import CommunityDetails from '@/features/communities/CommunityDetails';

const CommunityPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl">
                Community posts
            </h2>
            <CommunityDetails />
        </div>
    );
};

export default CommunityPage;
