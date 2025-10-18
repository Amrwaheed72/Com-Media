import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useGetComments from './useGetComments';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import useAddComment from './useAddComment';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

import CommentItem from './CommentItem';
import LoginAlert from '@/ui/LoginAlert';
import { useMemo } from 'react';

export const commentSchema = z.object({
    content: z.string().min(1, 'a comment must not be empty'),
});

interface Props {
    postId: number;
}

export interface CommentInput {
    content: string;
    parent_comment_id?: number | null;
}

export interface Comment {
    id: number;
    post_id: number;
    parent_comment_id: number | null;
    user_id: string;
    created_at: string;
    content: string;
    author: string;
}
export type CommentNode = Comment & { children: CommentNode[] };

const Comments = ({ postId }: Props) => {
    const { mutate, isPending: isCreatingComment } = useAddComment();
    const {
        data: comments,
        isPending,
        error,
        refetch,
    } = useGetComments(postId);
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: { content: '' },
    });

    const onSubmit = (values: z.infer<typeof commentSchema>) => {
        mutate(
            {
                comment: {
                    content: values.content,
                    parent_comment_id: null,
                },
                postId: Number(postId),
            },
            {
                onSuccess: () => {
                    toast.success('Comment added!');
                    queryClient.invalidateQueries({
                        queryKey: ['comments', postId],
                    });
                    form.reset();
                },
                onError: (err) => {
                    toast.error(
                        err.message || 'Error adding comment, please try again'
                    );
                },
            }
        );
    };
    const commentTree = useMemo(() => {
        if (!comments) return [];

        const map = new Map<number, CommentNode>();
        const roots: CommentNode[] = [];

        comments.forEach((comment) => {
            map.set(comment.id, { ...comment, children: [] });
        });

        comments.forEach((comment) => {
            if (comment.parent_comment_id != null) {
                const parent = map.get(comment.parent_comment_id);
                if (parent) {
                    parent.children.push(map.get(comment.id)!);
                }
            } else {
                roots.push(map.get(comment.id)!);
            }
        });

        if (isPending) return <Spinner size="lg" variant="ring" />;
        if (error)
            return (
                <ErrorFallBack
                    message="error displaying comments"
                    onRetry={refetch}
                />
            );

        return roots;
    }, [comments]);

    return (
        <div className="mt-6">
            <h3 className="mb-4 text-2xl font-semibold">Comments</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        className="resize-none"
                                        rows={5}
                                        placeholder="Write a comment..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <LoginAlert
                        isCreating={isCreatingComment}
                        isDirty={form.formState.isDirty}
                        label="Add a Comment"
                        message="comment on this post"
                        size="lg"
                        progress="Adding Comment..."
                    />
                </form>
            </Form>
            {/* comments */}
            <div>
                {commentTree.map((comment, i) => (
                    <CommentItem key={i} comment={comment} postId={postId} />
                ))}
            </div>
        </div>
    );
};

export default Comments;
