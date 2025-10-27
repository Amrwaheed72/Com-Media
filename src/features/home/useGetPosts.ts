import { getPosts } from '@/services/apiPosts';
import { useQuery } from '@tanstack/react-query';

const useGetPosts = (from: number, to: number) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['posts', from, to],
        queryFn: () => getPosts(from, to),
        refetchOnWindowFocus: false,
    });

    return {
        posts: data?.posts ?? [],
        totalCount: data?.count ?? 0,
        isPending,
        error,
        refetch,
    };
};

export default useGetPosts;
