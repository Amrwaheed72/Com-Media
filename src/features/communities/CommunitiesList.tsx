import { Spinner } from '@/components/ui/spinner';
import useGetCommunities from './useGetCommunities';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Empty from '@/ui/Empty';
import Paginate from '@/ui/Paginate';
import { lazy, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import useJoinCommunity from './useJoinCommunity';
import { useUserAuth } from '@/store/UserAuth';
import { toast } from 'sonner';
import useGetUserCommunities from './useGetUserCommunities';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, LucideCircleArrowOutUpRight } from 'lucide-react';
import useLeaveCommunity from './useLeaveCommunity';

const LoginAlert=lazy(()=>import('@/ui/LoginAlert'))

const CommunitiesList = () => {
    const { user, loading, isAuthenticated } = useUserAuth();
    const [joiningId, setJoiningId] = useState(0);
    const [leavingId, setLeavingId] = useState(0);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { communities, totalCount, isPending, error, refetch } =
        useGetCommunities(from, to);
    const { mutate:join, isPending: isJoining } = useJoinCommunity();
    const { leave, isLeaving } = useLeaveCommunity();

    const {
        data: communities_ids,
    } = useGetUserCommunities(user?.id ?? '');

    const joinedCommunityIds = communities_ids?.map((com) => com.community_id);

    if (loading || isPending) {
        return (
            <div className="flex justify-center">
                <Spinner size="xl" variant="ring" />
            </div>
        );
    }

    if (error) {
        return (
            <ErrorFallBack
                message="Error displaying communities, please try again"
                onRetry={refetch}
            />
        );
    }

    if (!communities.length) {
        return (
            <Empty
                message="No communities to display, try to create one"
                type="community"
            />
        );
    }

    const totalPages = Math.ceil(totalCount / limit);

    const handleJoinCommunity = (id: number, name: string) => {
        if (!isAuthenticated || !user) {
            return null;
        }
        setJoiningId(id);
        join(
            { user_id: user.id, community_id: id },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['user-communities', user.id],
                    });
                    toast.success(`Joined ${name} community successfully`);
                    navigate(`/community/${id}`);
                },
                onError: () => {
                    toast.error(
                        'Failed to join this community, try again later'
                    );
                },
            }
        );
    };
    const handleLeaveCommunity = (id: number, name: string) => {
        if (!isAuthenticated || !user) {
            toast('You must login first to see these');
            navigate('/login');
            return null;
        }
        setLeavingId(id);
        leave(
            { user_id: user.id, community_id: id },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['user-communities', user.id],
                    });
                    toast(`Left ${name} community successfully`);
                },
                onError: (error) => {
                    throw new Error(error.message);
                },
            }
        );
    };

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-4">
            {communities?.map(({ id, name, description, created_at }) => (
                <div
                    key={id}
                    className="relative w-full max-w-5xl rounded-lg border p-4 shadow-md transition hover:translate-y-[-2px] hover:shadow-lg"
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
                        <div className="flex flex-col gap-2">
                            {joinedCommunityIds?.includes(id) ? (
                                <Link to={`/community/${id}`}>
                                    <Button className="w-[80px] bg-purple-600 hover:bg-purple-700">
                                        Visit <LucideCircleArrowOutUpRight />
                                    </Button>
                                </Link>
                            ) : (
                                <LoginAlert message="join this community">
                                    <Button
                                        onClick={() => {
                                            handleJoinCommunity(id, name);
                                        }}
                                        className="w-[80px] bg-purple-600 hover:bg-purple-700"
                                    >
                                        {isJoining && joiningId === id ? (
                                            <Spinner size="sm" variant="ring" />
                                        ) : (
                                            <>
                                                Join <LogIn />
                                            </>
                                        )}
                                    </Button>
                                </LoginAlert>
                            )}
                            {joinedCommunityIds?.includes(id) && (
                                <Button
                                    onClick={() => {
                                        handleLeaveCommunity(id, name);
                                        setLeavingId(id);
                                    }}
                                    className="w-[80px]"
                                    variant={'destructive'}
                                >
                                    {isLeaving && leavingId === id ? (
                                        <Spinner size="sm" variant="ring" />
                                    ) : (
                                        <>
                                            Leave <LogOut />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* {joinedCommunityIds?.includes(id) && (
                        <ToolTipComponent content="joined">
                            <Check className="absolute top-2 right-2 h-3 w-3" />
                        </ToolTipComponent>
                    )} */}
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
