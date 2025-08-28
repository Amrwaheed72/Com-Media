import { getPosts } from '@/services/api';
import { useUserAuth } from '@/store/UserAuth';
import { useQuery } from '@tanstack/react-query';

const useGetPosts = () => {
    // const isAuthenticated = useUserAuth((state) => state.isAuthenticated);
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        refetchOnWindowFocus: false,
        // enabled: isAuthenticated,
    });
    return { data, isPending, error, refetch };
};

export default useGetPosts;
