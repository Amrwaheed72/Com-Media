import { getUserById } from '@/services/apiUser';
import { useUserAuth } from '@/store/UserAuth';
import { useQuery } from '@tanstack/react-query';

const useGetUserData = () => {
    const { user } = useUserAuth();

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['user data', user?.id],
        queryFn: () => getUserById(user?.id!),
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetUserData;
