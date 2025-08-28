import { useParams } from 'react-router';
import useGetPost from './useGetPost';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Comments from './Comments';
import VoteButtons from './VoteButtons';

type PostIddd = {
    postId: string;
};
const PostDetails = () => {
    const { postId } = useParams<PostIddd>();
    const numericId = Number(postId);
    const { data, isPending, error, refetch } = useGetPost(numericId);
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
    console.log(data);
    const { title, image_url, content, created_at } = data;
    return (
        <div className="w-full space-y-6 overflow-hidden">
            <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl">
                {title}
            </h2>
            {image_url && (
                <img
                    src={image_url}
                    alt={title}
                    className="mt-4 h-64 w-full rounded object-cover"
                />
            )}
            <p className="text-gray-400">{content}</p>
            <p className="text-sm text-gray-500">
                Posted on: {new Date(created_at).toLocaleDateString()}{' '}
                <span className="text-xs font-semibold text-gray-500">
                    {new Date(created_at).toLocaleTimeString()}
                </span>
            </p>
            <VoteButtons postId={postId} />
            <Comments />
        </div>
    );
};

export default PostDetails;
