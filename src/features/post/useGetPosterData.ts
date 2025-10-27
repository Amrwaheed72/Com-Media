import { getUserById } from '@/services/apiUser';
import { useQuery } from '@tanstack/react-query';

const useGetPosterData = (user_id: string) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['poster data'],
        queryFn: () => getUserById(user_id),
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetPosterData;
