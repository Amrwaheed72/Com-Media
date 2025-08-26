import { Route, Routes } from 'react-router';
import { Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import Navbar from './ui/Navbar';
import { useEffect } from 'react';
import { cleanupAuthListener, initAuthListener } from './store/UserAuth';
import CreatePostPage from './pages/CreatePostPage';

function App() {
    useEffect(() => {
        initAuthListener();
        return () => cleanupAuthListener();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 pt-20 text-gray-900 transition-opacity duration-700 dark:bg-[rgba(10,10,10,0.8)] dark:text-gray-100">
            <Toaster richColors closeButton position="top-right" />
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                {/* <button
                    className="button bg-black p-4"
                    type="button"
                    onClick={() =>
                        toast('احا', {
                            description: 'Amr Waheed Mohamed',
                            // action: {
                            //     label: 'undo',
                            //     onClick: () => console.log('Undo'),
                            // },
                            // cancel:{
                            //   label:'Amr',
                            //   onClick:()=>console.log('amr')
                            // }
                        })
                    }
                >
                    {' '}
                    show toast
                </button> */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePostPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
