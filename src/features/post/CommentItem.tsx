import { Button } from '@/components/ui/button';
import { type Comment, type CommentNode } from './Comments';
import { useState } from 'react';
import { useUserAuth } from '@/store/UserAuth';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Link } from 'react-router';
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
import { Spinner } from '@/components/ui/spinner';
import useAddReply from './useAddReply';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
    comment: Comment & { children: CommentNode[] };
    postId: number;
}
export const replySchema = z.object({
    content: z.string().min(1, 'a reply must not be empty'),
});

const CommentItem = ({ comment, postId }: Props) => {
    const [showReply, setShowReply] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const isAuthenticated = useUserAuth((state) => state.isAuthenticated);
    const queryClient = useQueryClient();
    const user = useUserAuth((state) => state.user);
    const form = useForm<z.infer<typeof replySchema>>({
        resolver: zodResolver(replySchema),
        defaultValues: { content: '' },
    });

    const { mutate, isPending: isCreatingReply } = useAddReply(
        comment.id,
        postId
    );

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
                    setShowReply(false);
                },
                onError: (err) => {
                    if (!isAuthenticated) return;
                    toast.error(
                        err.message || 'Error adding reply, please try again'
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
                        src={user?.user_metadata.avatar_url}
                        alt={comment.author}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
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
                    {/* you could later add: Like, Report, Share buttons here */}
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
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                disabled={
                                                    !form.formState.isDirty ||
                                                    isCreatingReply
                                                }
                                                type="submit"
                                                className="rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                                            >
                                                {isCreatingReply ? (
                                                    <Spinner size="sm" />
                                                ) : (
                                                    'Post Reply'
                                                )}
                                            </Button>
                                        </AlertDialogTrigger>
                                        {!isAuthenticated && (
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Login Required
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        You must be logged in to
                                                        reply to this comment.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction asChild>
                                                        <Link to="/login">
                                                            Login
                                                        </Link>
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        )}
                                    </AlertDialog>
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
