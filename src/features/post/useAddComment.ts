import { useMutation } from '@tanstack/react-query';
import { createComment } from '@/services/apiComments';
import { useUserAuth } from '@/store/UserAuth';
import type { CommentInput } from '@/types/postTypes';

interface AddCommentProps {
    comment: CommentInput;
    postId: number;
}

const useAddComment = () => {
    const { user } = useUserAuth();
    const author =
        user?.user_metadata?.full_name ?? user?.user_metadata?.user_name;

    const { mutate, isPending } = useMutation({
        mutationFn: ({ comment, postId }: AddCommentProps) =>
            createComment(comment, postId, user?.id!, author),
    });

    return { mutate, isPending };
};

export default useAddComment;
