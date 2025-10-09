import { useParams } from 'react-router';
import useGetPost from './useGetPost';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Comments from './Comments';
import VoteButtons from './VoteButtons';
import { useUserAuth } from '@/store/UserAuth';
import useGetPosterData from './useGetPosterData';
import { Skeleton } from '@/components/ui/skeleton';

type PostIddd = {
    postId: string;
};
const PostDetails = () => {
    const user = useUserAuth((state) => state.user);
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
    console.log(userData);

    if (isPending)
        return (
            <div className="flex justify-center">
                <Spinner size="xl" variant="ring" />
            </div>
        );
    if (error)
        return (
            <ErrorFallBack
                message="Could not display the post details"
                onRetry={refetch}
            />
        );
    console.log(isLoadingUser);
    const { title, image_url, content, created_at } = data;
    return (
        <div className="mx-auto w-full max-w-4xl space-y-2 rounded-lg border-2 p-2 sm:p-12">
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
                    />
                    <h2 className="font-semibold">{userData.full_name}</h2>
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
        </div>
    );
};

export default PostDetails;
