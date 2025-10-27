export interface Community {
    id: number;
    name: string;
    description: string;
    created_at: string;
}
export interface CommunityId {
    id: number;
}

export interface Community {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface Post {
    id: number;
    title: string;
    image_url: string;
    content: string;
    created_at: string;
    avatar_url: string;
    community_id: number;
    communities?: { name: string } | null;
    user_id: string;
}
