import { createPost } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import type { PostInputs } from './formSchema';

interface CreatePostArgs {
    post: PostInputs;
    avatar_url?: string;
    user_id: string;
}

const useCreatePost = () => {
    const {
        mutate: createpost,
        isPending: isCreating,
        isError,
    } = useMutation({
        mutationFn: ({ post, avatar_url, user_id }: CreatePostArgs) =>
            createPost({ post, avatar_url, user_id }),
    });
    return { createpost, isCreating, isError };
};

export default useCreatePost;
