import * as Yup from 'yup';
export interface IRemoveProfileForm {
    password: string,
}
export interface IRemoveProfileServer {
    email: string,
    password: string,
}

export const validateRemoveProfile = Yup.object({
    password: Yup.string()
    .min(6, 'Password must be at least 6 charaters')
    .required("Required"),
})