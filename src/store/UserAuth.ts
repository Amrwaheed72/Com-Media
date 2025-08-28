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
        username?: string
    ) => Promise<{ data: any; error: any }>;
    resendConfirmation: (
        email: string
    ) => Promise<{ data?: any; error?: Error }>;

    signInWithPassword: (
        email: string,
        password: string
    ) => Promise<{ data: any; error: any }>;
    // resendConfirmation:
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

    signup: async (email, password, username) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: username },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error('Signup error:', error.message);
            return { error, data: null };
        }
        set({ user: data.user, lastSignupEmail: email });

        return { data, error: null, email };
    },
    resendConfirmation: async (email: string) => {
        const { data, error } = await supabase.auth.resend({
            type: 'signup',
            email,
        });

        if (error) {
            console.error(error.message);
            return { error };
        }

        return { data };
    },

    signInWithPassword: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Login error:', error.message);
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

let unsubscribe: (() => void) | null = null;

export const initAuthListener = () => {
    if (unsubscribe) return;

    const { data: subscription } = supabase.auth.onAuthStateChange(
        (event: AuthChangeEvent, session: Session | null) => {
            if (session?.user) {
                useUserAuth.setState({
                    user: session.user,
                    loading: false,
                    isAuthenticated: true,
                });

                if (event === 'SIGNED_IN') {
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
