import { Route, Routes } from 'react-router';
import { useCounterStore } from './store/useCounterStore';
import { toast, Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import Navbar from './ui/Navbar';

function App() {
    const count = useCounterStore((state) => state.count);
    const increment = useCounterStore((state) => state.increment);
    const decrement = useCounterStore((state) => state.decrement);
    return (
        <div>
            <Navbar />
            <div>
                <Toaster richColors closeButton position="bottom-right" />
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
                    <Route path="/" element={<HomePage />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
