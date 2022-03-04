import * as Yup from 'yup';
export interface ISocialLink {
    slot1: string,
    slot2: string,
    slot3: string,
}
export interface ISocialLinkServer {
    findEmail: string,
    slot1: string,
    slot2: string,
    slot3: string,
}

export const validateSocialLink = Yup.object({
    slot1: Yup.string()
    .url("Url do not valud"),
    slot2: Yup.string()
    .url("Url do not valud"),
    slot3: Yup.string()
    .url("Url do not valud"),
})