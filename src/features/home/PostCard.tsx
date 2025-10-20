import { Link } from 'react-router';
import type { Post } from './PostsList';
import useGetVotes from '../post/useGetVotes';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import {
    ChevronRight,
    MessageSquare,
    ThumbsDown,
    ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useGetComments from '../post/useGetComments';
import { motion } from 'framer-motion';
import useGetUserData from '../profile/useGetUserData';
import { Skeleton } from '@/components/ui/skeleton';
import useGetCommunityName from './useGetCommunityName';
import ToolTipComponent from '@/ui/ToolTipComponent';
import { useMemo } from 'react';

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    const PostData = useMemo(() => {
        return post;
    }, []);
    const {
        id,
        title,
        image_url,
        avatar_url,
        created_at,
        user_id,
        content,
        community_id,
    } = post;
    const {
        data: userData,
        isPending: isLoadingUser,
        error: errorUser,
        refetch: refetchUser,
    } = useGetUserData(user_id);
    const {
        data: votes,
        isPending: isLoadingVotes,
        error: errorVotes,
        refetch: refetchVotes,
    } = useGetVotes(id);

    const {
        data: comments,
        isPending: isLoadingComments,
        error: commentsError,
        refetch: refetchComments,
    } = useGetComments(id);

    const likes = useMemo(
        () => votes?.filter((like) => like.vote === 1).length || 0,
        [votes]
    );
    const dislikes = useMemo(
        () => votes?.filter((like) => like.vote === -1).length || 0,
        [votes]
    );
    const commentsCount = comments?.length;
    const { data, isPending, refetch, error } =
        useGetCommunityName(community_id);
    if (errorVotes || commentsError)
        return (
            <ErrorFallBack
                message="error displaying votes or comments count"
                onRetry={refetchVotes || refetchComments}
            />
        );

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group relative"
        >
            <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 blur-sm transition duration-300 group-hover:opacity-50" />
            <Card className="relative z-10 w-[340px] overflow-hidden">
                <Link to={`/post/${id}`} className="block">
                    <CardContent className="flex flex-col gap-5 p-5 px-8">
                        {isLoadingUser ? (
                            <div className="flex items-center justify-start gap-2">
                                <Skeleton className="h-10 w-10 rounded-full bg-gray-400" />
                                <Skeleton className="h-4 w-[170px] bg-gray-400" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-start gap-2">
                                <img
                                    src={avatar_url}
                                    alt={title}
                                    className="h-[35px] w-[35px] rounded-full object-cover"
                                    loading="lazy"
                                />
                                <h2 className="font-semibold">
                                    {userData.full_name}
                                </h2>
                                <ChevronRight className="h-4 w-4" />
                                {community_id === null ? (
                                    <h2 className="text-sm text-gray-400">
                                        public
                                    </h2>
                                ) : isPending ? (
                                    <Skeleton className="h-4 w-[100px] bg-gray-400" />
                                ) : (
                                    <ToolTipComponent content="view community">
                                        <h2
                                            className="text-sm font-semibold text-gray-400 hover:underline"
                                        >
                                            {data?.name}
                                        </h2>
                                    </ToolTipComponent>
                                )}
                            </div>
                        )}
                        <div className="ml-6 flex flex-col gap-1 sm:ml-4">
                            <div className="line-clamp-1 text-[20px] font-semibold">
                                {title}
                            </div>
                            <div className="line-clamp-2 text-sm text-gray-400">
                                {content}
                            </div>
                        </div>

                        <div>
                            <img
                                src={image_url}
                                alt={title}
                                className="mx-auto h-[150px] w-full rounded-[20px] object-cover"
                                loading="lazy"
                            />
                        </div>

                        {isLoadingVotes && isLoadingComments ? (
                            <div className="flex items-center justify-center gap-2">
                                <Spinner variant="ring" size="sm" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <Button variant="ghost" disabled>
                                    <ThumbsUp className="mr-1 h-4 w-4" />
                                    {likes}
                                </Button>
                                <Button variant="ghost" disabled>
                                    <ThumbsDown className="mr-1 h-4 w-4" />
                                    {dislikes}
                                </Button>
                                <Button variant="ghost" disabled>
                                    <MessageSquare className="mr-1 h-4 w-4" />
                                    {commentsCount}
                                </Button>
                            </div>
                        )}

                        {/* Date */}
                        <div className="flex flex-1 items-end justify-end">
                            {/* <div>{community_id}</div> */}
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(created_at).toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    }
                                )}{' '}
                                •{' '}
                                {new Date(created_at).toLocaleTimeString(
                                    'en-US',
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    }
                                )}
                            </p>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </motion.div>
    );
};

export default PostCard;
