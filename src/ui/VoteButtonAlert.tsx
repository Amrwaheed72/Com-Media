import { Button } from '@/components/ui/button';
import { useLoginDialogStore } from '@/store/LoginDialogStore';
import { lazy } from 'react';
import { Link } from 'react-router';

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
const VoteButtonAlert = () => {
    const { open, setOpen } = useLoginDialogStore();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login required!</DialogTitle>
                    <DialogDescription>
                        You must login to be able to perform this action
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                    <Button variant={'outline'}>Cancel</Button>
                    <Link to={'/login'}>
                        <Button>Login</Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VoteButtonAlert;
