import * as Yup from 'yup';
export interface IEmailForm {
    email: string,
    password: string,
}
export interface IEmailFormServer {
    findEmail: string,
    email: string,
    password: string,
}

export const validateEmail = Yup.object({
    email: Yup.string()
    .email('Email do not valid')
    .required('Required'),
    password: Yup.string()
    .required('Required')
    .min(6, "Password min lenght 6"),
})