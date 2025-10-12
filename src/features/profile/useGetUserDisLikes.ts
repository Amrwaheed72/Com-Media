import { userTotalDisLikes } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetUserDisLikes = (user_id: string) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['user_dislikes'],
        queryFn: () => userTotalDisLikes(user_id),
        enabled: !!user_id,
    });
    return { data, isPending, error, refetch };
};

export default useGetUserDisLikes;
