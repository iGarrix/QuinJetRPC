import * as Yup from 'yup';
export interface ISkillsForm {
    quote: string,
    language: string,
    skills: string,
}
export interface ISkillsFormServer {
    findEmail: string,
    quote: string,
    language: string,
    skills: string,
}

export const validateSkills = Yup.object({
    quote: Yup.string()
    .min(1, 'Required'),
    language: Yup.string()
    .min(1, 'Required'),
    skills: Yup.string()
    .min(1, 'Required'),
})