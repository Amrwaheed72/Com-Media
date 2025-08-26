import PostsList from '@/features/home/PostsList';

const HomePage = () => {
    return (
        <div className='pt-10'>
            <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-6xl font-bold text-transparent">
                Recent Posts
            </h2>
            <PostsList />
        </div>
    );
};

export default HomePage;
