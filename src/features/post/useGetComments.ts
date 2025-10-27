import { getComments } from '@/services/apiComments';
import { useQuery } from '@tanstack/react-query';

const useGetComments = (postId: number) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId),
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetComments;
