import { Spinner } from '@/components/ui/spinner';
import useGetPosts from './useGetPosts';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Empty from '@/ui/Empty';
import PostCard from './PostCard';
import { motion, AnimatePresence } from 'framer-motion';

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

    return (
        <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 },
                },
            }}
        >
            <AnimatePresence>
                {data.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default PostsList;
