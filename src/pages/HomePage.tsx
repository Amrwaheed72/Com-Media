import PostsList from '@/features/home/PostsList';

const HomePage = () => {
    return (
        <div className="">
            <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl">
                Recent Posts
            </h2>
            <PostsList />
        </div>
    );
};

export default HomePage;
