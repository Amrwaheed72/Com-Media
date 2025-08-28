// useUserAuth.ts
import { supabase } from '@/supabase';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { create } from 'zustand';

interface UserAuthType {
    user: User | null;
    loading: boolean;
    signup: (
        email: string,
        password: string,
        username?: string,
        phone?: string
    ) => Promise<{ data: any; error: any }>;
    resendConfirmation: (
        email: string
    ) => Promise<{ data?: any; error?: Error }>;
    signInWithPassword: (
        email: string,
        password: string
    ) => Promise<{ data: any; error: any }>;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signOut: () => Promise<void>;
    lastSignupEmail?: string;
    isAuthenticated: boolean;
}

export const useUserAuth = create<UserAuthType>((set) => ({
    user: null,
    loading: true,
    isAuthenticated: false,
    lastSignupEmail: undefined,
    signup: async (email, password, username, phone) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: username, phone: phone },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) {
            toast.error(error.message);
            return { error, data: null };
        }
        // ✅ No session yet because email not confirmed
        if (data.user && !data.session) {
            toast.info('Please verify your email to complete signup.');
            set({ lastSignupEmail: email });
        }
        return { data, error: null };
    },
    resendConfirmation: async (email: string) => {
        const { data, error } = await supabase.auth.resend({
            type: 'signup',
            email,
        });
        if (error) {
            toast.error(error.message);
            return { error };
        }
        toast.success('Confirmation email resent!');
        return { data };
    },
    signInWithPassword: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            if (error.message.includes('Email not confirmed')) {
                toast.error('Please verify your email before logging in.');
            } else {
                toast.error(error.message);
            }
            return { error, data: null };
        }
        return { data, error: null };
    },
    signInWithGoogle: async () => {
        await supabase.auth.signInWithOAuth({ provider: 'google' });
    },
    signInWithGithub: async () => {
        await supabase.auth.signInWithOAuth({ provider: 'github' });
    },
    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error);
        set({ user: null, isAuthenticated: false });
    },
}));

// 🔹 Listener
let unsubscribe: (() => void) | null = null;

export const initAuthListener = () => {
    if (unsubscribe) return;

    const { data: subscription } = supabase.auth.onAuthStateChange(
        (event: AuthChangeEvent, session: Session | null) => {
            // ⚙️ Get the state *before* it changes
            const previousUser = useUserAuth.getState().user;
            if (session?.user) {
                useUserAuth.setState({
                    user: session.user,
                    loading: false,
                    isAuthenticated: true,
                });
                if (event === 'SIGNED_IN' && !previousUser) {
                    toast.success('Logged in successfully!');
                }
            } else {
                useUserAuth.setState({
                    user: null,
                    loading: false,
                    isAuthenticated: false,
                });
                if (event === 'SIGNED_OUT') {
                    toast('You have logged out.');
                }
            }
        }
    );
    unsubscribe = () => subscription?.subscription.unsubscribe();
};

export const cleanupAuthListener = () => {
    if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
    }
};
