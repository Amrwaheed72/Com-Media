import { Spinner } from '@/components/ui/spinner';
import useGetCommunities from './useGetCommunities';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Empty from '@/ui/Empty';
import Paginate from '@/ui/Paginate';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import useJoinCommunity from './useJoinCommunity';
import { useUserAuth } from '@/store/UserAuth';
import { toast } from 'sonner';
import useGetUserCommunities from './useGetUserCommunities';
import { useQueryClient } from '@tanstack/react-query';

export interface Community {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

const CommunitiesList = () => {
    const user = useUserAuth((state) => state.user);
    const [joiningId, setJoiningId] = useState(0);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const limit = 10;
    const queryClient = useQueryClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { communities, totalCount, isPending, error, refetch } =
        useGetCommunities(from, to);
    const { mutate, isPending: isJoining } = useJoinCommunity();
    const {
        data: communities_ids,
        error: errorCommunities,
        isPending: isLoadingCommunities,
        refetch: refetchCommunities,
    } = useGetUserCommunities(user.id);
    const joinedCommunityIds = communities_ids?.map((com) => com.community_id);
    if (isPending)
        return (
            <div className="flex justify-center">
                <Spinner size="xl" variant="ring" />
            </div>
        );

    if (error) {
        return (
            <ErrorFallBack
                message="error displaying communities, please try again"
                onRetry={refetch}
            />
        );
    }

    if (!communities.length) {
        return (
            <Empty
                message="no communities to display, try to create one"
                type="community"
            />
        );
    }

    const totalPages = Math.ceil(totalCount / limit);

    const handleJoinCommunity = (id: number, name: string) => {
        mutate(
            { user_id: user.id, community_id: id },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['user-communities', user.id],
                    });
                    toast.success(`Joined ${name} Community successfully`);
                    navigate(`/community/${id}`);
                },
                onError: () => {
                    toast.error(
                        'failed to join this community, try again later'
                    );
                },
            }
        );
        setJoiningId(id);
    };

    return (
        <div className="mx-auto max-w-5xl space-y-4">
            {communities.map(({ id, name, description, created_at }) => (
                <div
                    key={id}
                    className="w-full rounded-lg border p-4 shadow-md transition hover:translate-y-[-2px] hover:shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-purple-500 hover:text-purple-600 hover:underline">
                                {name}
                            </h2>
                            <p className="text-md text-gray-600 dark:text-gray-300">
                                {description}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                {new Date(created_at).toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    }
                                )}
                            </p>
                        </div>
                        <Button
                            onClick={() => handleJoinCommunity(id, name)}
                            disabled={joinedCommunityIds?.includes(id)}
                            className="w-[140px] bg-purple-600 hover:bg-purple-700"
                        >
                            {isJoining && joiningId === id ? (
                                <Spinner size="sm" variant="ring" />
                            ) : joinedCommunityIds?.includes(id) ? (
                                'Joined'
                            ) : (
                                'Join Community'
                            )}
                        </Button>
                    </div>
                </div>
            ))}

            <Paginate
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default CommunitiesList;
