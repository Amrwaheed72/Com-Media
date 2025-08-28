import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import { useUserAuth } from '@/store/UserAuth';
import useMakingVotes from './useMakingVotes';
import useGetVotes from './useGetVotes';
import Like from './Like';
import DisLike from './DisLike';

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

    const likes = data?.filter((vote) => vote.vote === 1).length || 0;
    const dislikes = data?.filter((vote) => vote.vote === -1).length || 0;

    const userVote = data?.find((vote) => vote.user_id === user?.id)?.vote ?? 0;

    return (
        <div className="flex items-center justify-start gap-2">
            <Like
                likes={likes}
                mutate={mutate}
                isPending={isPending}
                userVote={userVote}
            />
            <DisLike
                dislikes={dislikes}
                mutate={mutate}
                isPending={isPending}
                userVote={userVote}
            />
        </div>
    );
};

export default VoteButtons;
