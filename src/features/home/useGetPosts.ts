import { getPosts } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetPosts = (from: number, to: number) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['posts', from, to], // include from/to in key
        queryFn: () => getPosts(from, to),
        // keepPreviousData: true, // ✅ keeps old data while fetching new page
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
