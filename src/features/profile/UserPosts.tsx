import { useUserAuth } from '@/store/UserAuth';
import useGetUserPosts from './useGetUserPosts';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Empty from '@/ui/Empty';
import PostCard from '../home/PostCard';

const UserPosts = () => {
    const user = useUserAuth((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate('/');
    }, []);
    const { data, isPending, error, refetch } = useGetUserPosts(user?.id ?? '');
    if (isPending) {
        return (
            <div className="flex w-full justify-center">
                <Spinner size="lg" variant="ring" />
            </div>
        );
    }
    if (error) {
        return (
            <ErrorFallBack message="Error displaying posts" onRetry={refetch} />
        );
    }
    if (!data?.data || data.data.length === 0) {
        return (
            <Empty
                message="No posts to display, try to create some"
                type="posts"
            />
        );
    }
    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className="text-gray-400">
                    Total Posts count:{' '}
                    <span className="font-semibold">
                        {data?.count ? data?.count : 'no posts'}{' '}
                    </span>
                </p>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8">
                {data.data.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};

export default UserPosts;
