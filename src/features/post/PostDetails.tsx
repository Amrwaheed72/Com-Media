import { useParams } from 'react-router';
import useGetPost from './useGetPost';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Comments from './Comments';
import VoteButtons from './VoteButtons';
import { useUserAuth } from '@/store/UserAuth';

type PostIddd = {
    postId: string;
};
const PostDetails = () => {
    const user = useUserAuth((state) => state.user);
    console.log(user);
    const { postId } = useParams<PostIddd>();
    const numericId = Number(postId);
    const { data, isPending, error, refetch } = useGetPost(numericId);
    console.log(data);
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
    const { title, image_url, content, created_at } = data;
    return (
        <div className="w-full space-y-6 overflow-hidden">
            <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-start text-4xl font-bold text-transparent md:text-6xl">
                {title}
            </h2>
            {image_url && (
                <img
                    src={image_url}
                    alt={title}
                    className="mt-4 h-128 w-full max-w-xl rounded-3xl object-cover"
                />
            )}
            <p className="text-gray-400">{content}</p>
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
