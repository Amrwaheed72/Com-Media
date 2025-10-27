import { getCommunityByName } from '@/services/apiCommunity';
import { useQuery } from '@tanstack/react-query';

const useGetCommunityName = () => {
    const {
        data: communities,
        isPending,
        error,
        refetch,
    } = useQuery({
        queryKey: ['communities-name'],
        queryFn: getCommunityByName,
        refetchOnWindowFocus: false,
    });
    return { communities, isPending, error, refetch };
};

export default useGetCommunityName;
