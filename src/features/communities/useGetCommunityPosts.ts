import { useQuery } from '@tanstack/react-query';
import { getCommunityPosts } from '@/services/api';
import type { Post } from './CommunityPosts';

interface CommunityPostsResponse {
    communityPosts: Post[];
    count: number;
}

const useGetCommunityPosts = (id: number, from: number, to: number) => {
    const { data, error, isPending, refetch } =
        useQuery<CommunityPostsResponse>({
            queryKey: ['community-posts', id, from, to],
            queryFn: () => getCommunityPosts(id, from, to),
            refetchOnWindowFocus:false
        });

    return {
        data: data?.communityPosts ?? [],
        totalCount: data?.count ?? 0,
        error,
        isPending,
        refetch,
    };
};

export default useGetCommunityPosts;
