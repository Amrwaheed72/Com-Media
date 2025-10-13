import { useUserAuth } from '@/store/UserAuth';
import ReusableInfoCard from '@/ui/ReusableInfoCard';
import useGetUserLikes from './useGetUserLikes';
import { useNavigate } from 'react-router';
import { FileText, Pencil, ThumbsDown, ThumbsUp, Users } from 'lucide-react';
import useGetUserDisLikes from './useGetUserDisLikes';
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';
import { toast } from 'sonner';
import useGetPosts from '../home/useGetPosts';

const ProfileOverview = () => {
    const { user, isAuthenticated, loading } = useUserAuth();
    const navigate = useNavigate();
    const {
        data: likes,
        isPending: isLoadingLikes,
        error: errorLikes,
        refetch: refetchLikes,
    } = useGetUserLikes(user?.id ?? '');
    const {
        data: dislikes,
        isPending: isLoadingDisLikes,
        error: errorDisLikes,
        refetch: refetchDislikes,
    } = useGetUserDisLikes(user?.id ?? '');
    if (!isAuthenticated || !user) {
        toast('You must login first to see these');
        navigate('/login');
        return null;
    }
    // const { data, isPending, error, refetch } = useGetPosts(0, 9);
    // const totalRows = data.count;
    if (loading) {
        return (
            <div className="flex justify-center">
                <Spinner size="xl" variant="ring" />
            </div>
        );
    }
    return (
        <div>
            <div>
                <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent">
                    Profile overview
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <ReusableInfoCard
                    title="Your Posts Count"
                    icon={<Pencil className="text-purple-500" />}
                >
                    <h3 className="text-2xl font-bold">3</h3>
                </ReusableInfoCard>
                <ReusableInfoCard
                    title="Your Communities Count"
                    icon={<Users className="text-yellow-500" />}
                >
                    <h3 className="text-2xl font-bold">3</h3>
                </ReusableInfoCard>
                <ReusableInfoCard
                    title="Your Likes Count"
                    icon={<ThumbsUp className="text-green-500" />}
                >
                    {isLoadingLikes ? (
                        <Spinner variant="ring" size="sm" />
                    ) : (
                        <h3 className="text-2xl font-bold">{likes?.count}</h3>
                    )}
                </ReusableInfoCard>
                <ReusableInfoCard
                    title="Your Dislikes Count"
                    icon={<ThumbsDown className="text-red-500" />}
                >
                    {isLoadingDisLikes ? (
                        <Spinner variant="ring" size="sm" />
                    ) : (
                        <h3 className="text-2xl font-bold">
                            {dislikes?.count}
                        </h3>
                    )}
                </ReusableInfoCard>
            </div>
        </div>
    );
};

export default ProfileOverview;
