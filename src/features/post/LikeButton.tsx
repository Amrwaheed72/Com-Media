import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import useMakingVotes from './useMakingVotes';
import useGetVotes from './useGetVotes';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import { useUserAuth } from '@/store/UserAuth';

export interface Props {
    postId: number;
}
export interface votes {
    id: number;
    post_id: number;
    user_id: string;
    vote: number;
}

const LikeButton = ({ postId }: Props) => {
        const user = useUserAuth((state) => state.user);
    const { mutate, isPending } = useMakingVotes(postId);
    const {
        data,
        isPending: isLoadingVotes,
        error,
        refetch,
    } = useGetVotes(postId);
    if (isLoadingVotes) return <Spinner variant="ring" size="md" />;
    if (error)
        return (
            <ErrorFallBack
                message="error displaying like and dislikes"
                onRetry={refetch}
            />
        );
    console.log(data);
    const likes = data?.filter((like) => like.vote === 1).length || 0;
    const dislikes = data?.filter((like) => like.vote === -1).length || 0;
    const userVote = data?.find((like) => like.user_id === user?.id)?.vote;
    return (
        <div className="flex items-center justify-start gap-2">
            <Button
                size={'lg'}
                variant={'outline'}
                onClick={() => mutate(1)}
                disabled={isPending}
                className={`cursor-pointer px-3 py-1 transition-colors duration-150 ${userVote === 1 ? 'bg-green-500 text-white hover:bg-green-600 hover:text-white dark:bg-green-500 dark:hover:bg-green-600' : ''}`}
            >
                <ThumbsUp />
                {likes}
            </Button>
            <Button
                size={'lg'}
                variant={'outline'}
                onClick={() => mutate(-1)}
                disabled={isPending}
                className={`cursor-pointer px-3 py-1 transition-colors duration-150 ${userVote === -1 ? 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600' : ''}`}
            >
                <ThumbsDown />
                {dislikes}
            </Button>
        </div>
    );
};

export default LikeButton;
