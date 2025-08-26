import { Button } from '@/components/ui/button';
import { OctagonAlert } from 'lucide-react';
import { toast } from 'sonner';

interface types {
    message: string;
    onRetry: () => void;
}
const ErrorFallBack = ({ message, onRetry }: types) => {
    message && toast.error(message);
    return (
        <div className="mx-auto flex h-full max-h-72 w-full max-w-2xl items-center justify-center rounded-2xl border-4 p-8">
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex flex-col items-center gap-2 font-semibold">
                    <OctagonAlert className="h-24 w-24 text-red-600" />
                    <p>Sorry, something went wrong</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    {message && (
                        <p className="text-2xl font-bold text-red-600">
                            {message}
                        </p>
                    )}
                    <Button
                        variant="outline"
                        onClick={onRetry}
                        className="cursor-pointer"
                    >
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallBack;
