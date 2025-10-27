import { getVotes } from '@/services/apiVotes';
import { useQuery } from '@tanstack/react-query';

const useGetVotes = (postId: number) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['votes', postId],
        queryFn: () => getVotes(postId),
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetVotes;
