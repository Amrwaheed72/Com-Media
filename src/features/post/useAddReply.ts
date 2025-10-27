import { useUserAuth } from '@/store/UserAuth';
import { useMutation } from '@tanstack/react-query';
import { createReply } from '@/services/apiComments';
import type { CommentInput } from '@/types/postTypes';

interface AddReplyArgs {
    reply: CommentInput;
    postId: number;
}

const useAddReply = (parentCommentId: number) => {
    const { user } = useUserAuth();
    const author =
        user?.user_metadata.full_name ?? user?.user_metadata?.user_name;

    const { mutate, isPending } = useMutation({
        mutationFn: ({ reply, postId }: AddReplyArgs) =>
            createReply(
                { ...reply, parent_comment_id: parentCommentId },
                postId,
                user?.id!,
                author
            ),
    });

    return { mutate, isPending };
};

export default useAddReply;
