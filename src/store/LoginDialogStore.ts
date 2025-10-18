import { create } from 'zustand';

interface LoginDialogState {
    open: boolean;
    setOpen: (state: boolean) => void;
}

export const useLoginDialogStore = create<LoginDialogState>((set) => ({
    open: false,
    setOpen: (state: boolean) => set({ open: state }),
}));
