import { createComment } from '@/services/api';
import { useUserAuth } from '@/store/UserAuth';
import { useMutation } from '@tanstack/react-query';
import type { CommentInput } from './Comments';

interface AddCommentArgs {
    comment: CommentInput;
    postId: number;
}

const useAddComment = () => {
    const user = useUserAuth((state) => state.user);
    const userId = user?.id;
    const author = user?.user_metadata.user_name;

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ comment, postId }: AddCommentArgs) => {
            if (!userId || !author) throw new Error('Not logged in');
            return createComment(comment, postId, userId, author);
        },
    });

    return { mutate, isPending };
};

export default useAddComment;
