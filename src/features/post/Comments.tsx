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
import { lazy } from 'react';
import { Button } from '@/components/ui/button';
import type { CommentNode, PostId } from '@/types/postTypes';
import { commentSchema } from '@/lib/schemas';
const LoginAlert = lazy(() => import('@/ui/LoginAlert'));

const Comments = ({ postId }: PostId) => {
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
                onError: (error) => {
                    console.log(error.message);
                    toast.error('Error adding comment, please try again later');
                },
            }
        );
    };
    const commentTree = (() => {
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

        return roots;
    })();

    if (isPending) return <Spinner size="lg" variant="ring" />;
    if (error)
        return (
            <ErrorFallBack
                message="error displaying comments"
                onRetry={refetch}
            />
        );
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
                    <LoginAlert message="comment on this post">
                        <Button
                            className="mt-2 cursor-pointer bg-purple-500 hover:bg-purple-600"
                            type="submit"
                            size={'lg'}
                            disabled={
                                isCreatingComment || !form.formState.isDirty
                            }
                        >
                            {isCreatingComment ? (
                                <>
                                    <Spinner variant="ring" size="sm" /> Adding
                                    Comment...
                                </>
                            ) : (
                                'Add a Comment'
                            )}
                        </Button>
                    </LoginAlert>
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
