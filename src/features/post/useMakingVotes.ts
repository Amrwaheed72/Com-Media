import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserAuth } from '@/store/UserAuth';
import { vote } from '@/services/apiVotes';

const useMakingVotes = (postId: number) => {
    const { user } = useUserAuth();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (voteValue: number) => vote(voteValue, postId, user?.id!),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['votes', postId],
            });
        },
    });

    return { mutate, isPending };
};

export default useMakingVotes;
