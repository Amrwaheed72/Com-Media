import { getVotes } from '@/services/api';
import { useUserAuth } from '@/store/UserAuth';
import { useQuery } from '@tanstack/react-query';

const useGetVotes = (postId: number) => {
    const isAuthenticated = useUserAuth((state) => state.isAuthenticated);
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['votes', postId],
        queryFn: () => getVotes(postId),
        refetchOnWindowFocus: false,
        enabled: isAuthenticated,
    });
    return { data, isPending, error, refetch };
};

export default useGetVotes;
