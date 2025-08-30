import { Spinner } from '@/components/ui/spinner';
import useGetCommunities from './useGetCommunities';
import ErrorFallBack from '@/ui/ErrorFallBack';
import Empty from '@/ui/Empty';
import { Link } from 'react-router';
import Paginate from '@/ui/Paginate';
import { useState } from 'react';

export interface Community {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

const CommunitiesList = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { communities, totalCount, isPending, error, refetch } =
        useGetCommunities(from, to);

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

    return (
        <div className="mx-auto max-w-5xl space-y-4">
            {communities.map(({ id, name, description, created_at }) => (
                <div
                    key={id}
                    className="w-full rounded-lg border p-4 shadow-md transition hover:translate-y-[-2px] hover:shadow-lg"
                >
                    <Link to={`/community/${id}`}>
                        <h2 className="text-2xl font-bold text-purple-500 hover:text-purple-600 hover:underline">
                            {name}
                        </h2>
                        <p className="text-md text-gray-600 dark:text-gray-300">
                            {description}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            {new Date(created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </p>
                    </Link>
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
