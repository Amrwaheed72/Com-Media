import { supabase } from "@/supabase";



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
