import { createPost } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import type { postInputs } from './formSchema';

const useCreatePost = () => {
    const {
        mutate: createpost,
        isPending: isCreating,
        isError,
    } = useMutation({
        mutationFn: (post: postInputs) => createPost(post),
    });
    return { createpost, isCreating, isError };
};

export default useCreatePost;
