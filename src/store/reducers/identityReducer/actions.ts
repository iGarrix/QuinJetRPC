import { Dispatch } from "react";
import rq from '../../../basehttp';
import axios from "axios";
import { IAuthResponse, IdentityAction, IdentityActionTypes, ILoginForm, ILoginFormServer, IProfile, IRegisterFormServer, IUpdateAvatarServer } from "./types";
import jwt_decode from "jwt-decode";
import { ISocialLinkServer } from "../../../components/AccountManage/Settings/Sociallink/types";
import { IPhoneFormServer } from "../../../components/AccountManage/Settings/Phone/types";
import { IFioFormServer } from "../../../components/AccountManage/Settings/Fio/types";
import { IWorkstudyFormServer } from "../../../components/AccountManage/Settings/Workstudy/types";
import { ISkillsFormServer } from "../../../components/AccountManage/Settings/Skills/types";
import { IEmailFormServer } from "../../../components/AccountManage/Settings/Email/types";
import { IPasswordFormServer } from "../../../components/AccountManage/Settings/Password/types";
import { IVerifyFormServer } from "../../../components/AccountManage/Settings/VerifyProfile/types";
import { IRemoveProfileServer } from "../../../components/AccountManage/Settings/RemoveProfile/types";

export const registerUser = (data: IRegisterFormServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});          
            if (data.avatar && data.birthday) {              
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("surname", data.surname);
                formData.append("nickname", data.nickname);
                formData.append("birthday", new Date(data.birthday).toUTCString());
                formData.append("gender", data.gender);
                formData.append("phone", data.phone);
                formData.append("email", data.email);
                formData.append("avatar", data.avatar);
                formData.append("country", data.country);
                formData.append("password", data.password);
                formData.append("isstayonline", data.isstayonline ? "true" : "false");
                const responseReg = await rq.post<IAuthResponse>('api/User/Register', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }});
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data.user});
                localStorage.setItem("token", responseReg.data.token);
                localStorage.setItem("expiredin", new Date(responseReg.data.expiredIn).toUTCString());
            }
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const loginUser = (data: ILoginFormServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                           
            const responseReg = await rq.post<IAuthResponse>('api/User/Login', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data.user});           
            localStorage.setItem("token", responseReg.data.token);
            localStorage.setItem("expiredin", new Date(responseReg.data.expiredIn).toUTCString());
            await AuthUser(responseReg.data.token, dispatch);
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const logoutUser = () => {
    return (dispatch: Dispatch<IdentityAction>) => {
        dispatch({type: IdentityActionTypes.SETPROFILE, payload: null});
        localStorage.removeItem("token");
        localStorage.removeItem("expiredin");
    }
}

export const updateAvatarUser = (data: IUpdateAvatarServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {
            if (data.avatar !== null) {           
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});  
                const formData = new FormData();
                    formData.append("findEmail", data.findEmail);
                    formData.append("avatar", data.avatar);                         
                const responseReg = await rq.put<IProfile>('api/User/UpdateAvatar', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }});
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data});  
            }
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const getImagesUser = (data: string) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETIMAGE_WAITING, payload: true});                          
            const responseReg = await rq.get<Array<string>>('api/User/GetImagesUser?email=' + data);
            dispatch({type: IdentityActionTypes.SETIMAGE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETIMAGE, payload: responseReg.data});  
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETIMAGE_WAITING, payload: false});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const updateSocialLinkUser = (data: ISocialLinkServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.put<IProfile>('api/User/UpdateSocial', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data});  
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const updateFioUser = (data: IFioFormServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.put<IProfile>('api/User/UpdateFios', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data});  
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const updatePhoneUser = (data: IPhoneFormServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.put<IProfile>('api/User/UpdatePhone', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data});  
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const updateWorkstudyUser = (data: IWorkstudyFormServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.put<IProfile>('api/User/UpdateWork', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data});  
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const updateSkillsUser = (data: ISkillsFormServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.put<IProfile>('api/User/UpdateAboutSkills', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data});  
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const updateEmailUser = (data: IEmailFormServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.put<IProfile>('api/User/UpdateEmail', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: null});
            localStorage.removeItem("token");
            localStorage.removeItem("expiredin");
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                console.log(error.response?.data) 
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const updatePasswordUser = (data: IPasswordFormServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.put<IProfile>('api/User/UpdatePassword', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: null});
            localStorage.removeItem("token");
            localStorage.removeItem("expiredin");
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                console.log(error.response?.data) 
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const updateStatusUser = (data: IVerifyFormServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.put<IProfile>('api/User/UpdateStatus', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data});
            dispatch({type: IdentityActionTypes.MESSAGE, payload: "Verify profile.Your profile successully verified"});
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                console.log(error.response?.data) 
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const removeUser = (data: IRemoveProfileServer) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.delete<any>('api/User/RemoveAccount', { data: data});
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: null});
            localStorage.removeItem("token");
            localStorage.removeItem("expiredin");
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const verifyEmailUser = (data : string) => {
    return async (dispatch: Dispatch<IdentityAction>) => {
        try {         
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: true});                          
            const responseReg = await rq.put<IProfile>('api/User/ConfirmEmail', data);
            dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
            dispatch({type: IdentityActionTypes.SETPROFILE, payload: responseReg.data});
            dispatch({type: IdentityActionTypes.MESSAGE, payload: "Confirm email.Your email successfully confirmed"});
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                dispatch({type: IdentityActionTypes.SETPROFILE_WAITING, payload: false});
                dispatch({type: IdentityActionTypes.SETPROFILE_ERROR, payload: error.response?.data});
                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
            }          
        }
    }
}

export const AuthUser = async (token: string, dispatch: Dispatch<IdentityAction>) =>  {
    const decode = jwt_decode(token) as any;
    const response = await rq.get<IProfile>('api/User/GetUser?email=' + decode.email);
    dispatch({type: IdentityActionTypes.SETPROFILE, payload: response.data})
}
