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
