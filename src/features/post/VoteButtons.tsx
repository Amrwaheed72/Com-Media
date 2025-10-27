import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import { useUserAuth } from '@/store/UserAuth';
import useMakingVotes from './useMakingVotes';
import useGetVotes from './useGetVotes';
import { lazy } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import type { VoteProps } from '@/types/postTypes';

const LoginAlert = lazy(() => import('@/ui/LoginAlert'));

const VoteButtons = ({ postId }: VoteProps) => {
    const { user } = useUserAuth();
    const { mutate, isPending } = useMakingVotes(postId);

    const {
        data,
        isPending: isLoadingVotes,
        error,
        refetch,
    } = useGetVotes(postId);

    const likes = data?.filter((vote) => vote.vote === 1).length || 0;
    const dislikes = data?.filter((vote) => vote.vote === -1).length || 0;
    const userVote = data?.find((vote) => vote.user_id === user?.id)?.vote ?? 0;

    if (isLoadingVotes) return <Spinner variant="ring" size="md" />;
    if (error)
        return (
            <ErrorFallBack
                message="error displaying like and dislikes"
                onRetry={refetch}
            />
        );

    return (
        <div className="flex items-center justify-start gap-2">
            <LoginAlert message="like this post">
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => mutate(1)}
                    disabled={isPending}
                    className={`cursor-pointer px-3 py-1 transition-colors duration-150 ${
                        userVote === 1
                            ? 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600'
                            : ''
                    }`}
                >
                    <ThumbsUp />
                    {likes}
                </Button>
            </LoginAlert>
            <LoginAlert message="dislike this post">
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => mutate(-1)}
                    disabled={isPending}
                    className={`cursor-pointer px-3 py-1 transition-colors duration-150 ${
                        userVote === -1
                            ? 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600'
                            : ''
                    }`}
                >
                    <ThumbsDown />
                    {dislikes}
                </Button>
            </LoginAlert>
        </div>
    );
};

export default VoteButtons;
