import type { postInputs } from '@/features/createPost/formSchema';
import { supabase } from '@/supabase';

interface CreatePostArgs {
    post: postInputs;
    avatar_url?: string;
}

export const createPost = async ({ post, avatar_url }: CreatePostArgs) => {
    const filepath = `${post.title}-${Date.now()}-${post.image_url.name}`;
    const { error: uploadError } = await supabase.storage
        .from('post images')
        .upload(filepath, post.image_url);
    if (uploadError) throw new Error(uploadError.message);
    const { data: publicUrlData } = supabase.storage
        .from('post images')
        .getPublicUrl(filepath);
    const { data, error } = await supabase
        .from('posts')
        .insert({ ...post, image_url: publicUrlData.publicUrl, avatar_url });

    if (error) throw new Error(error.message);
    return data;
};

export const getPosts = async () => {
    let { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return posts;
};
export const getPostById = async (postId: number) => {
    let { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();
    // .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return post;
};

export const vote = async (
    voteValue: number,
    postId: number,
    userId: string
) => {
    const { data: existingVote } = await supabase
        .from('votes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .maybeSingle();
    if (existingVote) {
        if (existingVote.vote === voteValue) {
            const { error } = await supabase
                .from('votes')
                .delete()
                .eq('id', existingVote.id);
            if (error) throw error;
        } else {
            const { error } = await supabase
                .from('votes')
                .update({ vote: voteValue })
                .eq('id', existingVote.id);
            if (error) throw error;
        }
    } else {
        const { error } = await supabase
            .from('votes')
            .insert({ post_id: postId, user_id: userId, vote: voteValue });
        if (error) throw error;
    }
};

export const getVotes = async (postId: number) => {
    let { data: votes, error } = await supabase
        .from('votes')
        .select('*')
        .eq('post_id', postId);
    if (error) throw error;
    return votes;
};
