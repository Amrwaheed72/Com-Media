import { Spinner } from '@/components/ui/spinner';
import useGetPosts from './useGetPosts';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Empty from '@/ui/Empty';
import PostCard from './PostCard';

export interface Post {
    id: number;
    title: string;
    image_url: string;
    content: string;
    created_at: string;
    avatar_url: string;
}

const PostsList = () => {
    const { data, isPending, error, refetch } = useGetPosts();

    if (isPending)
        return (
            <div className="flex justify-center">
                <Spinner size="xl" variant="ring" />
            </div>
        );
    if (error)
        return (
            <ErrorFallBack
                message="Could not display posts"
                onRetry={refetch}
            />
        );
    if (!data || data.length === 0)
        return (
            <Empty message="No posts to display, try to create one or join community to display their posts" />
        );
    console.log(data);
    return (
        <div className="flex flex-wrap justify-center gap-6">
            {data.map((post) => (
                <PostCard post={post} key={post.id} />
            ))}
        </div>
    );
};

export default PostsList;
