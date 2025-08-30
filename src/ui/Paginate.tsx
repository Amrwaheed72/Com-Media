import { Button } from '@/components/ui/button';

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Paginate = ({ page, totalPages, onPageChange }: Props) => {
    return (
        <div className="mt-6 flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Prev
            </Button>

            <span className="px-2 text-sm text-gray-600 dark:text-gray-300">
                Page {page} of {totalPages}
            </span>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </Button>
        </div>
    );
};

export default Paginate;
