// useMakingVotes.ts
import { vote } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserAuth } from '@/store/UserAuth';
import { toast } from 'sonner';

const useMakingVotes = (postId: number) => {
    const user = useUserAuth((state) => state.user);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (voteValue: number) => {
            if (!user) {
                toast.error('You must be logged in to vote');
                return;
            }
            return vote(voteValue, postId, user.id);
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
