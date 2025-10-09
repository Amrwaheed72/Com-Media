import { getUserById } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const useGetPosterData = (user_id: string) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['poster data'],
        queryFn: () => getUserById(user_id),
    });
    return { data, isPending, error, refetch };
};

export default useGetPosterData;
