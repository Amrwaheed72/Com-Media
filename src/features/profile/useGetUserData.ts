import { getUserById } from '@/services/apiUser';
import { useQuery } from '@tanstack/react-query';

const useGetUserData = (user_id: string) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['user data', user_id],
        queryFn: () => getUserById(user_id),
        enabled: !!user_id,
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetUserData;
