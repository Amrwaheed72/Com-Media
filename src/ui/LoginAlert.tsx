import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useUserAuth } from '@/store/UserAuth';
import { Link } from 'react-router';

import { lazy } from 'react';
type ButtonSize = React.ComponentProps<typeof Button>['size'];

const Dialog = lazy(() =>
    import('@/components/ui/dialog').then((mod) => ({ default: mod.Dialog }))
);
const DialogContent = lazy(() =>
    import('@/components/ui/dialog').then((mod) => ({
        default: mod.DialogContent,
    }))
);
const DialogDescription = lazy(() =>
    import('@/components/ui/dialog').then((mod) => ({
        default: mod.DialogDescription,
    }))
);
const DialogHeader = lazy(() =>
    import('@/components/ui/dialog').then((mod) => ({
        default: mod.DialogHeader,
    }))
);
const DialogTitle = lazy(() =>
    import('@/components/ui/dialog').then((mod) => ({
        default: mod.DialogTitle,
    }))
);
const DialogTrigger = lazy(() =>
    import('@/components/ui/dialog').then((mod) => ({
        default: mod.DialogTrigger,
    }))
);
interface LoginAlertProps {
    isCreating: boolean;
    isDirty: boolean;
    message: string;
    size?: ButtonSize;
    label: string;
    progress: string;
}

const LoginAlert: React.FC<LoginAlertProps> = ({
    isCreating,
    isDirty,
    message,
    size = 'default',
    label,
    progress,
}) => {
    const { isAuthenticated } = useUserAuth();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="mt-2 cursor-pointer bg-purple-500 hover:bg-purple-600"
                    type="submit"
                    size={size}
                    disabled={isCreating || !isDirty}
                >
                    {isCreating ? (
                        <>
                            <Spinner variant="ring" size="sm" /> {progress}
                        </>
                    ) : (
                        label
                    )}
                </Button>
            </DialogTrigger>
            {!isAuthenticated && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Login required</DialogTitle>
                        <DialogDescription>
                            You must login to be able to {message}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                        <Button variant={'outline'}>Cancel</Button>
                        <Link to={'/login'}>
                            <Button>Login</Button>
                        </Link>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
};

export default LoginAlert;
