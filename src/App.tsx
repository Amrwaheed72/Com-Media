import { Route, Routes, useNavigate } from 'react-router';
import { Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import Navbar from './ui/Navbar';
import { useEffect } from 'react';
import {
    cleanupAuthListener,
    initAuthListener,
    useUserAuth,
} from './store/UserAuth';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyEmail from './pages/VarifyEmail';
import AuthCallback from './pages/AuthCallback';
import Layout from './pages/Layout';
import AuthLayout from './pages/AuthLayout';

function App() {
    const isAuthenticated = useUserAuth((state) => state.isAuthenticated);
    useEffect(() => {
        initAuthListener();
        return () => cleanupAuthListener();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 pt-20 text-gray-900 transition-opacity duration-700 dark:bg-[rgba(10,10,10,0.8)] dark:text-gray-100">
            <Toaster richColors closeButton position="top-right" />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePostPage />} />
                    <Route path="/post/:postId" element={<PostPage />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
