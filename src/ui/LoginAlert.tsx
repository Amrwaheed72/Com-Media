import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useLoginDialogStore } from '@/store/LoginDialogStore';
import { useUserAuth } from '@/store/UserAuth';
import { Link } from 'react-router';

interface LoginAlertProps {
    message: string;

    children: React.ReactNode;
}

const LoginAlert: React.FC<LoginAlertProps> = ({ message, children }) => {
    const { isAuthenticated } = useUserAuth();

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            {!isAuthenticated && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Login required</DialogTitle>
                        <DialogDescription>
                            You must login to be able to {message}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>
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
