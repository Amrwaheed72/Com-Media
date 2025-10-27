import { supabase } from '@/supabase';
import type { CommentInput } from '@/types/postTypes';

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
    user_id: string,
    author: string
) => {
    const { error } = await supabase.from('comments').insert({
        post_id: postId,
        content: comment.content,
        parent_comment_id: comment.parent_comment_id ?? null,
        user_id: user_id,
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
    const { error } = await supabase.from('comments').insert({
        post_id: postId,
        content: reply.content,
        parent_comment_id: reply.parent_comment_id ?? null,
        user_id: userId,
        author,
    });

    if (error) throw error;
};

export const getCommentOwnerInfo = async (user_id: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user_id)
        .single();
    if (error) throw error;
    return { data };
};
