import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useUserAuth } from '@/store/UserAuth';
import { Link } from 'react-router';

const LoginAlert = ({ isCreating, isDirty, message, size, label }) => {
    const isAuthenticated = useUserAuth((state) => state.isAuthenticated);

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        className="mt-2 cursor-pointer bg-purple-500 hover:bg-purple-600"
                        type="submit"
                        size={size}
                        disabled={isCreating || !isDirty}
                    >
                        {isCreating ? (
                            <Spinner variant="ring" size="sm" />
                        ) : (
                            label
                        )}
                    </Button>
                </AlertDialogTrigger>
                {!isAuthenticated && (
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Login required</AlertDialogTitle>
                            <AlertDialogDescription>
                                You must login to be able to {message}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
                                <Link to="/login">Login</Link>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                )}
            </AlertDialog>
        </div>
    );
};

export default LoginAlert;
