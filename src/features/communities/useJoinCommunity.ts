import { joinCommunity } from '@/services/apiCommunity';
import { useMutation } from '@tanstack/react-query';

const useJoinCommunity = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: ({
            user_id,
            community_id,
        }: {
            user_id: string;
            community_id: number;
        }) => joinCommunity(user_id, community_id),
    });
    return { mutate, isPending };
};

export default useJoinCommunity;
