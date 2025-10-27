import { createCommunity } from '@/services/apiCommunity';
import { useUserAuth } from '@/store/UserAuth';
import { useMutation } from '@tanstack/react-query';

interface CreateCommunityInput {
    name: string;
    description: string;
}

const useCreateCommunity = () => {
    const { mutate, isPending: isCreating } = useMutation({
        mutationFn: ({ name, description }: CreateCommunityInput) =>
            createCommunity(name, description),
    });

    return { mutate, isCreating };
};

export default useCreateCommunity;
