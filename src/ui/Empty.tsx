import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

interface types {
    message: string;
    type: string;
}

const Empty = ({ message, type }: types) => {
    return (
        <div className="mx-auto flex h-full max-h-72 w-full max-w-2xl items-center justify-center rounded-2xl border-4 p-8">
            <div className="flex flex-col items-center gap-8">
                <p className="">{message}</p>
                <div className="flex w-full items-center justify-evenly gap-2">
                    {type === 'community' ? (
                        <Button size={'sm'} variant={'outline'}>
                            <Link to={'/community/create'}>
                                Create Community
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button size={'sm'} variant={'outline'}>
                                <Link to={'/communities'}>
                                    Join communities
                                </Link>
                            </Button>
                            <Button variant={'outline'}>
                                <Link to={'/create'}>Create Post</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Empty;
