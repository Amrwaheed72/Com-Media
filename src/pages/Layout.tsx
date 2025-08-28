import Navbar from '@/ui/Navbar';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <main className="container mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
