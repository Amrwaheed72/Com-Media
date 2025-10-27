import { Spinner } from '@/components/ui/spinner';
import useGetPosts from './useGetPosts';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Empty from '@/ui/Empty';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Paginate from '@/ui/Paginate';
import PostCard from './PostCard';
import type { Post } from '@/types/postTypes';

const PostsList = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { posts, totalCount, isPending, error, refetch } = useGetPosts(
        from,
        to
    );
    const totalPages = Math.ceil(totalCount / limit);

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

    if (!posts || posts.length === 0)
        return (
            <Empty
                message="No posts to display, try to create one or join community to display their posts"
                type="none"
            />
        );

    return (
        <div className="w-full">
            <motion.div
                className="flex flex-wrap justify-center gap-12"
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
                <AnimatePresence >
                    {posts.map((post: Post) => (
                        <PostCard post={post} key={post.id} />
                    ))}
                </AnimatePresence>
            </motion.div>
            <Paginate
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default PostsList;
