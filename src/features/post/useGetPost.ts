import { getPostById } from '@/services/api';
import { useUserAuth } from '@/store/UserAuth';
import { useQuery } from '@tanstack/react-query';

const useGetPost = (postId: number) => {
    const isAuthenticated = useUserAuth((state) => state.isAuthenticated);
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postId),
        refetchOnWindowFocus: false,
        enabled: isAuthenticated,
    });
    return { data, isPending, error, refetch };
};

export default useGetPost;
