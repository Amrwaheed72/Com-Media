import { createPost } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import type { postInputs } from './formSchema';

interface CreatePostArgs {
    post: postInputs;
    avatar_url?: string;
}

const useCreatePost = () => {
    const {
        mutate: createpost,
        isPending: isCreating,
        isError,
    } = useMutation({
        mutationFn: ({ post, avatar_url }: CreatePostArgs) =>
            createPost({ post, avatar_url }),
    });
    return { createpost, isCreating, isError };
};

export default useCreatePost;
