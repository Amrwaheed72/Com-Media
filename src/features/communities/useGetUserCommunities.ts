import { getUserCommunities } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetUserCommunities = (user_id: string) => {
    const { data, error, isPending, refetch } = useQuery({
        queryKey: ['user-communities', user_id],
        queryFn: () => getUserCommunities(user_id),
        refetchOnWindowFocus: false,
        enabled: !!user_id,
    });
    return { data, error, isPending, refetch };
};

export default useGetUserCommunities;
