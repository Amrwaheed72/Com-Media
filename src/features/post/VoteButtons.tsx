import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import { useUserAuth } from '@/store/UserAuth';
import useMakingVotes from './useMakingVotes';
import useGetVotes from './useGetVotes';
import { useMemo, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useLoginDialogStore } from '@/store/LoginDialogStore';

export interface Props {
    postId: number;
}

export interface Vote {
    id: number;
    post_id: number;
    user_id: string;
    vote: number;
}

const VoteButtons = ({ postId }: Props) => {
    const { user, isAuthenticated } = useUserAuth();
    const { setOpen } = useLoginDialogStore();
    const { mutate, isPending } = useMakingVotes(postId);

    const {
        data,
        isPending: isLoadingVotes,
        error,
        refetch,
    } = useGetVotes(postId);

    const likes = useMemo(() => {
        return data?.filter((vote) => vote.vote === 1).length || 0;
    }, [data]);
    const dislikes = useMemo(() => {
        return data?.filter((vote) => vote.vote === -1).length || 0;
    }, [data]);

    const userVote = useMemo(() => {
        return data?.find((vote) => vote.user_id === user?.id)?.vote ?? 0;
    }, [data]);

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
            <Button
                size="lg"
                variant="outline"
                onClick={() => {
                    if (!isAuthenticated) {
                        setOpen(true);
                    }
                    mutate(1);
                }}
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
            <Button
                size="lg"
                variant="outline"
                onClick={() => {
                    if (!isAuthenticated) {
                        setOpen(true);
                    }
                    mutate(-1);
                }}
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
        </div>
    );
};

export default VoteButtons;
