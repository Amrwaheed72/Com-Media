import SignUp from '@/features/logIn&signUp/SignUp';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
const SignUpPage = () => {
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
            <SignUp />
        </div>
    );
};

export default SignUpPage;
