import { Link } from 'react-router';
import type { Post } from './PostsList';
import useGetVotes from '../post/useGetVotes';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    const { id, title, image_url, avatar_url, created_at } = post;
    const { data, isPending: isLoadingVotes, error, refetch } = useGetVotes(id);

    // if (isLoadingVotes) return ;
    if (error)
        return (
            <ErrorFallBack
                message="error displaying like and dislikes"
                onRetry={refetch}
            />
        );

    const likes = data?.filter((like) => like.vote === 1).length || 0;
    const dislikes = data?.filter((like) => like.vote === -1).length || 0;

    return (
        <div className="group relative">
            <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 blur-sm transition duration-300 group-hover:opacity-50" />

            <Card className="relative z-10 overflow-hidden transition-colors duration-300">
                <Link to={`/post/${id}`} className="block">
                    <CardContent className="flex flex-col gap-5 p-5 px-8">
                        <div className="flex items-center gap-2">
                            {avatar_url ? (
                                <img
                                    src={avatar_url}
                                    alt={title}
                                    className="h-[35px] w-[35px] rounded-full"
                                />
                            ) : (
                                <div className="h-[35px] w-[35px] rounded-full bg-gradient-to-r from-[#8a2be2] to-[#491f70]" />
                            )}
                            <div className="flex-1 text-[20px] leading-[22px] font-semibold">
                                {title}
                            </div>
                        </div>

                        <div>
                            <img
                                src={image_url}
                                alt={title}
                                className="mx-auto max-h-[150px] w-full rounded-[20px] object-cover"
                            />
                        </div>
                        {isLoadingVotes ? (
                            <div className="flex items-center justify-center gap-2">
                                <Spinner variant="ring" size="md" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <Button variant="ghost" disabled>
                                    <ThumbsUp className="mr-1 h-4 w-4" />
                                    {likes}
                                </Button>
                                <Button variant="ghost" disabled>
                                    <ThumbsDown className="mr-1 h-4 w-4" />
                                    {dislikes}
                                </Button>
                            </div>
                        )}

                        {/* Date */}
                        <div className="flex flex-1 items-end justify-end">
                            <p className="text-muted-foreground text-sm">
                                {new Date(created_at).toLocaleDateString()},{' '}
                                <span className="text-xs font-semibold">
                                    {new Date(created_at).toLocaleTimeString()}
                                </span>
                            </p>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </div>
    );
};

export default PostCard;
