import { getCommentOwnerInfo } from '@/services/apiComments';
import { useQuery } from '@tanstack/react-query';

const useGetCommentOwner = (user_id: string) => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['comment-owner', user_id],
        queryFn: () => getCommentOwnerInfo(user_id),
        refetchOnWindowFocus: false,
    });
    return { data, isPending, error, refetch };
};

export default useGetCommentOwner;
