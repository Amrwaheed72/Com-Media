import { useUserAuth } from '@/store/UserAuth';
import useGetUserPosts from './useGetUserPosts';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Empty from '@/ui/Empty';
import PostCard from '../home/PostCard';
import { toast } from 'sonner';

const UserPosts = () => {
    const { user, isAuthenticated, loading } = useUserAuth();
    const navigate = useNavigate();
    const { data, isPending, error, refetch } = useGetUserPosts(user?.id ?? '');
    if (loading || isPending) {
        return (
            <div className="flex justify-center">
                <Spinner size="xl" variant="ring" />
            </div>
        );
    }
    if (!isAuthenticated || !user) {
        toast('You must login first to see these');
        navigate('/login');
        return null;
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
                    Total Posts count:
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
