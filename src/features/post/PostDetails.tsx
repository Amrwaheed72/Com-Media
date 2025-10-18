import { Link, useParams } from 'react-router';
import useGetPost from './useGetPost';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Comments from './Comments';
import VoteButtons from './VoteButtons';
import useGetPosterData from './useGetPosterData';
import { Skeleton } from '@/components/ui/skeleton';
import useGetCommunityName from '../home/useGetCommunityName';
import { ChevronRight } from 'lucide-react';
import ToolTipComponent from '@/ui/ToolTipComponent';

import VoteButtonAlert from '@/ui/voteButtonAlert';

type PostIddd = {
    postId: string;
};
const PostDetails = () => {
    const { postId } = useParams<PostIddd>();
    const numericId = Number(postId);
    const { data, isPending, error, refetch } = useGetPost(numericId);
    const user_id = data?.user_id;

    const {
        data: userData,
        isPending: isLoadingUser,
        error: errorUser,
        refetch: refetchUser,
    } = useGetPosterData(user_id);
    const {
        data: comName,
        isPending: LoadingCommName,
        refetch: RefetchComName,
        error: ErrorCommName,
    } = useGetCommunityName(data?.community_id);

    if (isPending)
        return (
            <div className="flex justify-center">
                <Spinner size="xl" variant="ring" />
            </div>
        );
    if (error || errorUser)
        return (
            <ErrorFallBack
                message="Could not display the post details"
                onRetry={refetch || refetchUser}
            />
        );
    const { title, image_url, content, created_at } = data;
    return (
        <div className="mx-auto w-full max-w-sm space-y-2 rounded-lg border-2 p-2 sm:max-w-4xl sm:p-12">
            {isLoadingUser ? (
                <div className="flex items-center justify-start gap-2">
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-400" />
                    <Skeleton className="h-4 w-[170px] bg-gray-400" />
                </div>
            ) : (
                <div className="flex items-center justify-start gap-2">
                    <img
                        src={userData.avatar_url}
                        className="h-10 w-10 rounded-full"
                        alt={userData.full_name}
                        loading="lazy"
                    />
                    <h2 className="font-semibold">{userData.full_name}</h2>
                    <ChevronRight className="h-4 w-4" />
                    {data.community_id === null ? (
                        <h2 className="text-sm text-gray-400">public</h2>
                    ) : LoadingCommName ? (
                        <Skeleton className="h-4 w-[100px] bg-gray-400" />
                    ) : (
                        <Link to={`/community/${data.community_id}`}>
                            <ToolTipComponent content="view community">
                                <h2 className="text-sm font-semibold text-gray-400 hover:underline">
                                    {comName?.name}
                                </h2>
                            </ToolTipComponent>
                        </Link>
                    )}
                </div>
            )}
            <h2 className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-start text-2xl font-bold text-transparent sm:text-4xl">
                {title}
            </h2>
            <p className="text-2xl text-gray-400">{content}</p>
            {image_url && (
                <img
                    src={image_url}
                    alt={title}
                    className="mt-4 w-full max-w-xl rounded-3xl object-contain"
                    loading="lazy"
                />
            )}

            <p className="text-sm text-gray-500">
                Posted on: {new Date(created_at).toLocaleDateString()}{' '}
                <span className="text-xs font-semibold text-gray-500">
                    {new Date(created_at).toLocaleTimeString()}
                </span>
            </p>
            <VoteButtons postId={numericId} />
            <Comments postId={numericId} />
            <VoteButtonAlert />
        </div>
    );
};

export default PostDetails;
