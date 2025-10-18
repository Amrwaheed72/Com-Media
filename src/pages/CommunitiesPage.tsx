import CommunitiesList from '@/features/communities/CommunitiesList';

const CommunitiesPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl">
                Communities
            </h2>
            <CommunitiesList />
        </div>
    );
};

export default CommunitiesPage;
