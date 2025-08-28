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
import { useUserAuth } from '@/store/UserAuth';
import { ThumbsUp } from 'lucide-react';
import { Link } from 'react-router';

interface Props {
    likes: number;
    mutate: (voteValue: number) => void;
    isPending: boolean;
    userVote: number;
}

const Like = ({ likes, mutate, isPending, userVote }: Props) => {
    const isAuthenticated = useUserAuth((state) => state.isAuthenticated);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => mutate(1)}
                    disabled={isPending}
                    className={`cursor-pointer px-3 py-1 transition-colors duration-150 ${
                        userVote === 1
                            ? 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600'
                            : ''
                    }`}
                >
                    <ThumbsUp />
                    {likes}
                </Button>
            </AlertDialogTrigger>

            {!isAuthenticated && (
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Login required</AlertDialogTitle>
                        <AlertDialogDescription>
                            You must login to be able to like this post
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
    );
};

export default Like;
