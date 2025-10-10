export interface UserData {
    id: string;
    email: string | null;
    phone: string;
    created_at: string | null;
    last_sign_in_at: string | null;
    updated_at: string;
    is_anonymous: boolean;
    app_metadata?: Record<string, any>;
    user_metadata: UserMetadata;
}
export interface UserMetadata {
    user_name: string;
    full_name: string;
    email: string;
    avatar_url: string;
    name: string;
    email_verified: boolean;
    phone_verified: boolean;
}
