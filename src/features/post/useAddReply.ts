import { createReply } from '@/services/api';
import { useUserAuth } from '@/store/UserAuth';
import { useMutation } from '@tanstack/react-query';
import type { CommentInput } from './Comments';

interface AddReplyArgs {
    reply: CommentInput;
    postId: number;
}

const useAddReply = (parentCommentId: number, postId: number) => {
    const user = useUserAuth((state) => state.user);
    const userId = user?.id;
    const author = user?.user_metadata.user_name;

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ reply, postId }: AddReplyArgs) => {
            if (!userId || !author) throw new Error('Not logged in');
            return createReply(
                { ...reply, parent_comment_id: parentCommentId },
                postId,
                userId,
                author
            );
        },
    });

    return { mutate, isPending };
};

export default useAddReply;
