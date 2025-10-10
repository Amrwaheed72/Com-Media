import { getUserById } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetUserData = (user_id: string) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['user data'],
        queryFn: () => getUserById(user_id),
    });
    return { data, isPending, error, refetch };
};

export default useGetUserData;
