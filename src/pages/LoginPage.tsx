import Login from '@/features/logIn&signUp/Login';
import { ModeToggle } from '@/ui/ModeToggle';

const LoginPage = () => {
    return (
        <div className="pt-20">
            <ModeToggle />
            <Login />
        </div>
    );
};

export default LoginPage;
