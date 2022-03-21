export interface UserDTO {
    avatar?: string;
    createTime?: Date;
    description?: string;
    email?: string;
    id?: number;
    mfaType?: UserDTO.MfaTypeEnum;
    nickname?: string;
    updateTime?: Date;
    username?: string;
}
export namespace UserDTO {
    export type MfaTypeEnum = 'NONE' | 'TFA_TOTP';
    export const MfaTypeEnum = {
        NONE: 'NONE' as MfaTypeEnum,
        TFATOTP: 'TFA_TOTP' as MfaTypeEnum
    };
}

export interface Ouath {
    access_token?: string;
    refresh_token?: string;
}

export interface Repo {
    full_name?: string;
    status?: string;
    html_url?: string;
}

export interface GithubUser {
    access_token?: string;
    refresh_token?: string;
    expires_in?: string;

    login?: string;
    id?: number;
    node_id?: string;
    avatar_url?: string;
    gravatar_id?: string;
    url?: string;
    html_url?: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    starred_url?: string;
    subscriptions_url?: string;
    organizations_url?: string;
    repos_url?: string;
    events_url?: string;
    received_events_url?: string;
    type?: string;
    site_admin?: boolean;
    name?: string;
    company?: string;
    blog?: string;
    location?: string;
    email?: string;
    hireable?: boolean;
    bio?: string;
    twitter_username?: any;
    public_repos?: number;
    public_gists?: number;
    followers?: number;
    following?: number;
    created_at?: Date;
    updated_at?: Date;
}
