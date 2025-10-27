import { Button } from '@/components/ui/button';
import { lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import z from 'zod';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import useAddReply from './useAddReply';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import useGetCommentOwner from './useGetCommentOwner';
import type { CommentItemProps } from '@/types/postTypes';
import { replySchema } from '@/lib/schemas';

const LoginAlert = lazy(() => import('@/ui/LoginAlert'));
const CommentItem = ({ comment, postId }: CommentItemProps) => {
    const [showReply, setShowReply] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const queryClient = useQueryClient();
    
    const form = useForm<z.infer<typeof replySchema>>({
        resolver: zodResolver(replySchema),
        defaultValues: { content: '' },
    });
    const { data, isPending, error, refetch } = useGetCommentOwner(
        comment.user_id
    );
    const { mutate, isPending: isCreatingReply } = useAddReply(comment.id);

    const commentOwnerInfo = data?.data;
    const onSubmit = (values: z.infer<typeof replySchema>) => {
        mutate(
            {
                reply: {
                    content: values.content,
                },
                postId: Number(postId),
            },
            {
                onSuccess: () => {
                    toast.success('Reply added!');
                    queryClient.invalidateQueries({
                        queryKey: ['comments', postId],
                    });
                    form.reset();
                },
                onError: (err) => {
                    toast.error(
                        err.message || 'Error adding the reply, try again later'
                    );
                },
            }
        );
    };

    return (
        <div className="flex items-start space-x-4 rounded-lg border-2 p-4 shadow-sm transition hover:shadow-md">
            {/* Avatar */}
            <div className="flex-shrink-0">
                {comment.author ? (
                    <img
                        src={commentOwnerInfo?.user_metadata.avatar_url}
                        alt={comment.author}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-700 dark:bg-gray-600 dark:text-gray-200">
                        {comment.author.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Main content */}
            <div className="flex-1">
                {/* Header */}
                <div className="mb-1 flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {comment.author}
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.created_at).toLocaleDateString(
                            'en-US',
                            {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            }
                        )}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.created_at).toLocaleTimeString(
                            'en-US',
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                            }
                        )}
                    </span>
                </div>

                {/* Content */}
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    {comment.content}
                </p>

                {/* Actions */}
                <div className="mb-2 flex items-center space-x-3">
                    <Button
                        onClick={() => setShowReply((prev) => !prev)}
                        variant="ghost"
                        size="sm"
                        className="h-auto px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        {showReply ? 'Cancel' : 'Reply'}
                    </Button>
                </div>

                {/* Reply Form */}
                {showReply && (
                    <div className="mt-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    className="resize-none rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-zinc-950 dark:text-gray-100"
                                                    placeholder={`Replying to ${comment.author}...`}
                                                    rows={3}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end">
                                    <LoginAlert message="reply on this comment">
                                        <Button
                                            className="mt-2 cursor-pointer bg-purple-500 hover:bg-purple-600"
                                            type="submit"
                                            size={'sm'}
                                            disabled={
                                                !form.formState.isDirty ||
                                                isCreatingReply
                                            }
                                        >
                                            {isCreatingReply ? (
                                                <>
                                                    <Spinner
                                                        variant="ring"
                                                        size="sm"
                                                    />
                                                    Replying...
                                                </>
                                            ) : (
                                                'Reply'
                                            )}
                                        </Button>
                                    </LoginAlert>
                                </div>
                            </form>
                        </Form>
                    </div>
                )}

                {/* Children Comments */}
                <div>
                    <Button
                        variant={'ghost'}
                        className="cursor-pointer dark:hover:bg-gray-900"
                        onClick={() => setIsCollapsed((prev) => !prev)}
                    >
                        {isCollapsed ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                </div>
                <AnimatePresence>
                    {isCollapsed && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            {comment.children?.map((child) => (
                                <div
                                    key={child.id}
                                    className="mt-4 border-l border-gray-100 pl-4 dark:border-gray-700"
                                >
                                    <CommentItem
                                        comment={child}
                                        postId={postId}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CommentItem;
