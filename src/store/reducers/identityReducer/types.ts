import * as Yup from 'yup';

export interface IdentityState {
    profile: IProfile | null,
    images: Array<string> | null,
    loading: boolean,
    error: string,
    message: string
}

export enum IdentityActionTypes {
    SETPROFILE = "SETPROFILE",
    SETPROFILE_WAITING = "SETPROFILE_WAITING",
    SETPROFILE_ERROR = "SETPROFILE_ERROR",

    SETIMAGE = "SETIMAGE",
    SETIMAGE_WAITING = "SETIMAGE_WAITING",
    SETIMAGE_ERROR = "SETIMAGE_ERROR",

    CLEAR = "CLEAR",
    ERROR = "ERROR",
    MESSAGE = "MESSAGE"
}

export interface IProfile {
    name: string,
    surname: string,
    nickname: string,
    birthDay: Date,
    gender: string,
    phone: string,
    email: string,
    status: string,
    jobGeolocation: string,
    studyGeolocation: string,
    jobName: string,
    studyName: string,
    socialSlot1: string,
    socialSlot2: string,
    socialSlot3: string,
    quote: string,
    language: string,
    skills: string,
    country: string,
    popularity: number,
    avatar: string,
    emailConfirmed: boolean,
}

export const validate = Yup.object({
    name: Yup.string()
      .required('Required'),
    surname: Yup.string()
      .required('Required'),
    nickname: Yup.string()
      .required('Required'),
    phone: Yup.string()
      .required('Required'),
    country: Yup.string()
      .required('Required'),
    gender: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
})

export const validateLogin = Yup.object({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 charaters')
    .required('Password is required'),
})

export interface IRegisterForm {
    name: string,
    surname: string,
    nickname: string,
    email: string,
    phone: string,
    country: string,
    gender: string,
    password: string,
    confPassword: string,
}


export interface IRegisterFormServer {
    name: string,
    surname: string,
    nickname: string,
    email: string,
    phone: string,
    country: string,
    birthday: Date | null | undefined,
    gender: string,
    password: string,
    avatar: File | null,
    isstayonline: boolean,
}

export interface ILoginForm {
  email: string,
  password: string,
}

export interface ILoginFormServer {
  email: string,
  password: string,
  isstayonline: boolean,
}

export interface IUpdateAvatarServer {
  findEmail: string,
  avatar: File | null,
}

export interface IAuthResponse {
    token: string,
    expiredIn: Date,
    user: IProfile,
}

export interface IRemoveImageServer {
    email: string,
    image: string,
}

export interface IAddImageServer {
  email: string,
  file: File | null,
}

export interface IdentitySetprofileAction {
    type: IdentityActionTypes.SETPROFILE,
    payload: IProfile | null,
}
export interface IdentitySetprofileWaitingAction {
    type: IdentityActionTypes.SETPROFILE_WAITING,
    payload: boolean,
}
export interface IdentitySetprofileErrorAction {
    type: IdentityActionTypes.SETPROFILE_ERROR,
    payload: string,
}

export interface IdentitySetimageAction {
  type: IdentityActionTypes.SETIMAGE,
  payload: Array<string> | null,
}
export interface IdentitySetimageWaitingAction {
  type: IdentityActionTypes.SETIMAGE_WAITING,
  payload: boolean,
}
export interface IdentitySetimageErrorAction {
  type: IdentityActionTypes.SETIMAGE_ERROR,
  payload: string,
}

export interface IdentityErrorAction {
    type: IdentityActionTypes.ERROR,
    payload: string,
}
export interface IdentityClearAction {
    type: IdentityActionTypes.CLEAR,
    payload: string,
}

export interface IdentityMessageAction {
  type: IdentityActionTypes.MESSAGE,
  payload: string,
}

export type IdentityAction = IdentitySetprofileAction | IdentitySetprofileWaitingAction | IdentitySetprofileErrorAction | IdentityErrorAction | IdentityClearAction |
IdentitySetimageAction | IdentitySetimageWaitingAction | IdentitySetimageErrorAction | IdentityMessageAction;