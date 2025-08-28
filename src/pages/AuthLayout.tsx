import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <main className="container mx-auto px-4 py-6">
            <Outlet />
        </main>
    );
};

export default AuthLayout;
