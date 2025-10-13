import type { Community } from '@/features/communities/CommunitiesList';
import type { Post } from '@/features/communities/CommunityPosts';
import type { PostInputs } from '@/features/createPost/formSchema';
import type { CommentInput } from '@/features/post/Comments';
import { supabase } from '@/supabase';

interface CreatePostArgs {
    post: PostInputs;
    avatar_url?: string;
    user_id: string;
}

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

export const getPosts = async (from: number, to: number) => {
    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' }) // count = total rows
        .range(from, to)
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return { posts: data ?? [], count: count ?? 0 };
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

export const getComments = async (postId: number) => {
    let { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
    if (error) throw error;
    return comments;
};

export const createComment = async (
    comment: CommentInput,
    postId: number,
    userId: string,
    author: string
) => {
    if (!userId || !author) throw new Error('you must be logged in to comment');

    const { error } = await supabase.from('comments').insert({
        post_id: postId,
        content: comment.content,
        parent_comment_id: comment.parent_comment_id ?? null,
        user_id: userId,
        author: author,
    });

    if (error) throw error;
};
export const createReply = async (
    reply: CommentInput,
    postId: number,
    userId: string,
    author: string
) => {
    if (!userId || !author) throw new Error('you must be logged in to reply');

    const { error } = await supabase.from('comments').insert({
        post_id: postId,
        content: reply.content,
        parent_comment_id: reply.parent_comment_id ?? null,
        user_id: userId,
        author,
    });

    if (error) throw error;
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

export const getUserCommunities = async (user_id: string) => {
    const { data, error } = await supabase
        .from('community_members')
        .select('community_id')
        .eq('user_id', user_id);
    if (error) throw error;
    return data;
};

// export const useGetUserCommunities = async (user_id:string) => {
//     const { data, error, count } = await supabase.from('community_members')
// };
