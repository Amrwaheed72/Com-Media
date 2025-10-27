import { getUserTotalDisLikes } from '@/services/apiUser';
import { useUserAuth } from '@/store/UserAuth';
import { useQuery } from '@tanstack/react-query';

const useGetUserDisLikes = () => {
    const { user } = useUserAuth();

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['user_dislikes', user?.id],
        queryFn: () => getUserTotalDisLikes(user?.id!),
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetUserDisLikes;
