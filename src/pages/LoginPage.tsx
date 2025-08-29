import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Login from '@/features/logIn&signUp/Login';
import { ModeToggle } from '@/ui/ModeToggle';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div className="pt-20">
            <div className="absolute top-4 left-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={'outline'}
                            className="cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            <MoveLeft />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Go Back</TooltipContent>
                </Tooltip>
            </div>
            {/* <ModeToggle /> */}
            <Login />
        </div>
    );
};

export default LoginPage;
