import { IdentityAction, IdentityActionTypes, IdentityState } from "./types";


const inialState : IdentityState = {
    profile: null,
    loading: false,
    error: "",
    images: null,
    message: "",
}

export const identityReducer = (state=inialState, action: IdentityAction) : IdentityState => {
    switch(action.type) {
       
        case IdentityActionTypes.SETPROFILE: {
            return {
                ...state, 
                    profile: action.payload,
                    loading: false,
                    error: "",
            };
        }
        case IdentityActionTypes.SETPROFILE_WAITING: {
            return {
                ...state, 
                    loading: action.payload
            };
        }
        case IdentityActionTypes.SETPROFILE_ERROR: {
            return {
                ...state, 
                    error: action.payload
            };
        }

        case IdentityActionTypes.SETIMAGE: {
            return {
                ...state, 
                    images: action.payload,
                    loading: false,
                    error: "",
            };
        }
        case IdentityActionTypes.SETIMAGE_WAITING: {
            return {
                ...state, 
                    loading: action.payload
            };
        }
        case IdentityActionTypes.SETIMAGE_ERROR: {
            return {
                ...state, 
                    error: action.payload
            };
        }

        case IdentityActionTypes.CLEAR: {
            return {
                ...state, 
                    profile: null,
                    loading: false,
                    error: "",
            };
        }
        case IdentityActionTypes.ERROR: {
            return {
                ...state, 
                    error: action.payload
            };
        }
        case IdentityActionTypes.MESSAGE: {
            return {
                ...state, 
                    message: action.payload
            };
        }
        default:
            return state;
    }
}

