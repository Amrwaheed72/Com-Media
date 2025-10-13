import { createCommunity } from '@/services/api';
import { useUserAuth } from '@/store/UserAuth';
import { useMutation } from '@tanstack/react-query';

interface CreateCommunityInput {
    name: string;
    description: string;
}

const useCreateCommunity = () => {
    const { isAuthenticated } = useUserAuth();
    const { mutate, isPending: isCreating } = useMutation({
        mutationFn: async ({ name, description }: CreateCommunityInput) => {
            if (!isAuthenticated) throw new Error('Not logged in');
            return createCommunity(name, description);
        },
    });

    return { mutate, isCreating };
};

export default useCreateCommunity;
