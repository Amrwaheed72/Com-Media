import { useState } from 'react';
import useGetCommunityPosts from './useGetCommunityPosts';
import Paginate from '@/ui/Paginate';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Empty from '@/ui/Empty';
import PostCard from '../home/PostCard';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    id: number;
}

export interface Community {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface Post {
    id: number;
    title: string;
    image_url: string;
    content: string;
    created_at: string;
    avatar_url: string;
    community_id: number;
    communities?: { name: string } | null;
}

const CommunityPosts = ({ id }: Props) => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, totalCount, error, refetch, isPending } =
        useGetCommunityPosts(id, from, to);

    const totalPages = Math.ceil(totalCount / limit);

    if (isPending) return <Spinner size="xl" variant="ring" />;
    if (error)
        return <ErrorFallBack message={error.message} onRetry={refetch} />;
    if (!data || data.length === 0) {
        return <Empty type="posts" message="no community posts to display" />;
    }

    return (
        <div className="w-full">
            <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-6xl font-bold text-transparent">
                {data && data[0].communities?.name} Community Posts
            </h2>

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
                    {data.map((post: Post) => (
                        <PostCard post={post} key={post.id} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* ✅ Pass pagination props */}
            <Paginate
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default CommunityPosts;
