import type { postInputs } from '@/features/createPost/formSchema';
import { supabase } from '@/supabase';

export const createPost = async (post: postInputs) => {
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
        .insert({ ...post, image_url: publicUrlData.publicUrl });

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
