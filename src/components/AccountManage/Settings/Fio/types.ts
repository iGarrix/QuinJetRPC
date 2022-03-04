import * as Yup from 'yup';
export interface IFioForm {
    name: string,
    surname: string,
    nickname: string,
    birthDay: Date | null,
    gender: string,
    country: string,
}
export interface IFioFormServer {
    findEmail: string,
    name: string,
    surname: string,
    nickname: string,
    birthDay: Date | null,
    gender: string,
    country: string,
}

export const validateFio = Yup.object({
    name: Yup.string()
    .min(3, 'Min lenght 3'),
    surname: Yup.string()
    .min(3, 'Min lenght 3'),
    nickname: Yup.string()
    .min(3, 'Min lenght 3'),
    country: Yup.string()
    .min(3, 'Min lenght 3'),
    gender: Yup.string()
    .min(4, 'Min lenght 4'),
})