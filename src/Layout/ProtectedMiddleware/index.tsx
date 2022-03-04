import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const ProtectedMiddleware : React.FC = () => {

    const user = useTypedSelector(state => state.identity.profile);
    const loader = useTypedSelector(state => state.identity.loading);
    const error = useTypedSelector(state => state.identity.error);

    const navigate = useNavigate();

    const fixnav = (path : string) => {
        window.scrollTo(0, 0);
        navigate(path);
    }

    useEffect(() => { 
        // if (user === null && loader === false && 
        //     (error === null || error === undefined || error.length === 0)) {
        //     navigate("/");
        // }
        const token : string = localStorage.token;
        if ((token === null || token === undefined) || (token !== null && token !== undefined && token.length === 0)) {
            fixnav("/");
        }
        return function cleanup() {
            
        }
    }, [user]);

    return (
        <Outlet/>
    )
}

export default ProtectedMiddleware;