import { getUserTotalLikes } from '@/services/apiUser';
import { useUserAuth } from '@/store/UserAuth';
import { useQuery } from '@tanstack/react-query';

const useGetUserLikes = () => {
    const { user } = useUserAuth();

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['user_likes', user?.id],
        queryFn: () => getUserTotalLikes(user?.id!),
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetUserLikes;
