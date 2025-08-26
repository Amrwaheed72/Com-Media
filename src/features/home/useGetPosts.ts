import { getPosts } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetPosts = () => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    });
    return { data, isPending, error, refetch };
};

export default useGetPosts;
