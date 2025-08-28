// useMakingVotes.ts
import { vote } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserAuth } from '@/store/UserAuth';

const useMakingVotes = (postId: number) => {
    const user = useUserAuth((state) => state.user);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (voteValue: number) => {
            vote(voteValue, postId, user.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['votes', postId],
            });
        },
    });

    return { mutate, isPending };
};

export default useMakingVotes;
