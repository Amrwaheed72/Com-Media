import { getUserTotalLikes } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetUserCommunities = (user_id: string) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['user_communities',user_id],
        queryFn: () => getUserTotalLikes(user_id),
        enabled: !!user_id,
    });
    return { data, isPending, error, refetch };
};

export default useGetUserCommunities;
