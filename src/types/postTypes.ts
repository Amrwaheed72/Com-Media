export interface Post {
    id: number;
    title: string;
    image_url: string;
    content: string;
    created_at: string;
    avatar_url: string;
    community_id: number;
    user_id: string;
}

export interface PostId {
    postId: number;
}

export interface CommentInput {
    content: string;
    parent_comment_id?: number | null;
}

export interface Comment {
    id: number;
    post_id: number;
    parent_comment_id: number | null;
    user_id: string;
    created_at: string;
    content: string;
    author: string;
}
export type CommentNode = Comment & { children: CommentNode[] };

export interface CommentItemProps {
    comment: Comment & { children: CommentNode[] };
    postId: number;
}

export interface VoteProps {
    postId: number;
}

export interface Vote {
    id: number;
    post_id: number;
    user_id: string;
    vote: number;
}