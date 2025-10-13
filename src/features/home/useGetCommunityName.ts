import { getCommunityNameById } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetCommunityName = (community_id: number) => {
    const { data, isPending, refetch, error } = useQuery({
        queryKey: ['community_name', community_id],
        queryFn: () => getCommunityNameById(community_id),
        refetchOnWindowFocus: false,
        enabled: !!community_id
    });
    return { data, isPending, refetch, error };
};

export default useGetCommunityName;
