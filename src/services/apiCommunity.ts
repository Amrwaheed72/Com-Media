import { supabase } from '@/supabase';
import type { Post } from '@/types/postTypes';

export const getAllCommunities = async (from: number, to: number) => {
    const { data, count, error } = await supabase
        .from('communities')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

    if (error) throw error;

    return {
        communities: data ?? [],
        count: count ?? 0,
    };
};
export const getCommunityByName = async () => {
    let { data, error } = await supabase.from('communities').select('name,id');
    if (error) throw error;
    return data;
};

export const createCommunity = async (
    name: string,
    description: string
): Promise<void> => {
    const { error } = await supabase
        .from('communities')
        .insert({ name, description });

    if (error) throw error;
};

export const getCommunityPosts = async (
    id: number,
    from: number,
    to: number
): Promise<{ communityPosts: Post[]; count: number }> => {
    const { data, error, count } = await supabase
        .from('posts')
        .select('*, communities(name)', { count: 'exact' })
        .eq('community_id', id)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) throw error;

    return {
        communityPosts: data ?? [],
        count: count ?? 0,
    };
};

export const joinCommunity = async (user_id: string, community_id: number) => {
    const { data, error } = await supabase
        .from('community_members')
        .insert({ user_id, community_id });
    if (error) throw error;
    return data;
};

export const leaveCommunity = async (user_id: string, community_id: number) => {
    const { error } = await supabase
        .from('community_members')
        .delete()
        .eq('user_id', user_id)
        .eq('community_id', community_id);
    if (error) throw error;
    return true;
};


export const getCommunityNameById = async (community_id: number) => {
    const { data, error } = await supabase
        .from('communities')
        .select('name,id')
        .eq('id', community_id)
        .single();
    if (error) throw error;
    return data;
};

