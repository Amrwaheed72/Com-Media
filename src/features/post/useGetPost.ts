import { getPostById } from '@/services/apiPosts';
import { useQuery } from '@tanstack/react-query';

const useGetPost = (postId: number) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postId),
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetPost;
