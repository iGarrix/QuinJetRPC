import * as Yup from 'yup';
export interface IPhoneForm {
    phone: string,
}
export interface IPhoneFormServer {
    findEmail: string,
    phone: string,
}

export const validatePhone = Yup.object({
    phone: Yup.string()
    .required("Required")
    .min(9, "This number do not valid")
    .max(9, "This number do not valid"),
})