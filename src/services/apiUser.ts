import { supabase } from '@/supabase';

export const getUserById = async (user_id: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user_id)
        .single();
    if (error) throw error;
    return data;
};

export const getUserPostsById = async (user_id: string) => {
    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('user_id', user_id)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return { data, count: count ?? 0 };
};

export const getUserTotalLikes = async (user_id: string) => {
    const { data, error, count } = await supabase
        .from('votes')
        .select('*', { count: 'exact' })
        .eq('user_id', user_id)
        .eq('vote', 1)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return { data, count: count };
};
export const getUserTotalDisLikes = async (user_id: string) => {
    const { data, error, count } = await supabase
        .from('votes')
        .select('*', { count: 'exact' })
        .eq('user_id', user_id)
        .eq('vote', -1)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return { data, count: count };
};

export const getUserCommunities = async (user_id: string) => {
    const { data, error } = await supabase
        .from('community_members')
        .select('community_id')
        .eq('user_id', user_id);
    if (error) throw error;
    return data;
};
