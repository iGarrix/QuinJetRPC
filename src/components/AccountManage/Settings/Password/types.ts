import * as Yup from 'yup';
export interface IPasswordForm {
    currentPassword: string,
    newPassword: string,
    confPassword: string,
}
export interface IPasswordFormServer {
    findEmail: string,
    currentPassword: string,
    newPassword: string,
}

export const validatePassword = Yup.object({
    currentPassword: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Password must match')
      .required('Confirm password is required'),
})