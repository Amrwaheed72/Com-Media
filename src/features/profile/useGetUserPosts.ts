import { getUserPostsById } from '@/services/apiUser';
import { useUserAuth } from '@/store/UserAuth';
import { useQuery } from '@tanstack/react-query';

const useGetUserPosts = () => {
    const { user } = useUserAuth();

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['my-posts', user?.id],
        queryFn: () => getUserPostsById(user?.id!),
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetUserPosts;
