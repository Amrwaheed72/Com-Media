import { getAllCommunities } from '@/services/apiCommunity';
import { useQuery } from '@tanstack/react-query';

const useGetCommunities = (from: number, to: number) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['communities', from, to],
        queryFn: () => getAllCommunities(from, to),
        refetchOnWindowFocus: false,
    });

    return {
        communities: data?.communities ?? [],
        totalCount: data?.count ?? 0,
        isPending,
        error,
        refetch,
    };
};

export default useGetCommunities;
