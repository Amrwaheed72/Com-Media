import { getUserPostsById } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetUserPosts = (user_id: string) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['my-posts', user_id],
        queryFn: () => getUserPostsById(user_id!),
        enabled: !!user_id,
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetUserPosts;
