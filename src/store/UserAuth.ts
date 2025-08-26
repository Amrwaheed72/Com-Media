// useUserAuth.ts
import { supabase } from '@/supabase';
import type { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserAuthType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const useUserAuth = create<UserAuthType>((set) => ({
    user: null,
    loading: true,

    signInWithGoogle: async () => {
        await supabase.auth.signInWithOAuth({ provider: 'google' });
    },
    signInWithGithub: async () => {
        await supabase.auth.signInWithOAuth({ provider: 'github' });
    },
    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error);
        set({ user: null });
    },
}));

// 🔹 safe listener setup
let unsubscribe: (() => void) | null = null;

export const initAuthListener = () => {
    if (unsubscribe) return; // already initialized ✅

    const { data: subscription } = supabase.auth.onAuthStateChange(
        (_event, session) => {
            if (session?.user) {
                useUserAuth.setState({ user: session.user, loading: false });
            } else {
                useUserAuth.setState({ user: null, loading: false });
            }
        }
    );

    unsubscribe = () => subscription?.subscription.unsubscribe();
};

// optional cleanup if you ever need it
export const cleanupAuthListener = () => {
    if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
    }
};
