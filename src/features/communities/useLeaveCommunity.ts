import { leaveCommunity } from '@/services/api';
import { useMutation } from '@tanstack/react-query';

const useLeaveCommunity = () => {
    const { mutate:leave, isPending:isLeaving } = useMutation({
        mutationFn: ({
            user_id,
            community_id,
        }: {
            user_id: string;
            community_id: number;
        }) => leaveCommunity(user_id, community_id),
    });
    return { leave, isLeaving };
};

export default useLeaveCommunity;
