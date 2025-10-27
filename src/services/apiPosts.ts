import type { PostInputs } from '@/features/createPost/formSchema';
import { supabase } from '@/supabase';


interface CreatePostArgs {
    post: PostInputs;
    avatar_url?: string;
    user_id: string;
}

export const getPosts = async (from: number, to: number) => {
    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return { posts: data ?? [], count: count ?? 0 };
};

export const getPostById = async (postId: number) => {
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();
    if (error) throw error;
    return post;
};

export const createPost = async ({
    post,
    avatar_url,
    user_id,
}: CreatePostArgs) => {
    // sanitize the title for storage path
    const safeTitle =
        post.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // keep only a-z, 0-9, replace others with -
            .replace(/^-+|-+$/g, '') || // trim leading/trailing dashes
        'post'; // fallback if nothing left

    const filepath = `${safeTitle}-${Date.now()}-${post.image_url.name}`;

    const { error: uploadError } = await supabase.storage
        .from('post images')
        .upload(filepath, post.image_url);

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrlData } = supabase.storage
        .from('post images')
        .getPublicUrl(filepath);

    const { data, error } = await supabase.from('posts').insert({
        ...post,
        image_url: publicUrlData.publicUrl,
        avatar_url,
        user_id,
    });

    if (error) throw new Error(error.message);

    return data;
};
