import { userTotalLikes } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetUserLikes = (user_id: string) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['user_likes'],
        queryFn: () => userTotalLikes(user_id),
        enabled: !!user_id,
    });
    return { data, isPending, error, refetch };
};

export default useGetUserLikes;
