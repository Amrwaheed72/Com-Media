import CreatePost from '@/features/createPost/CreatePost';

const CreatePostPage = () => {
    return (
        <div className="">
            <h2 className="mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl">
                Create New Post
            </h2>
            <CreatePost />
        </div>
    );
};

export default CreatePostPage;
