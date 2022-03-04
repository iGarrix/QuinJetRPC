import { Container, Box, Button, Backdrop, Alert, AlertTitle, CircularProgress, Snackbar, Checkbox } from "@mui/material";
import { FormikHelpers, useFormik, FormikProvider, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ILoginForm, ILoginFormServer, validateLogin } from "../../store/reducers/identityReducer/types";
import FormikField from "../common/FormikField";

const LoginUser : React.FC = () => {

    const navigate = useNavigate();
    const {loginUser} = useActions();

    const [openSnack, setOpenSnack] = React.useState(false);
    const [isstayonline, setonline] = useState(false);
    
    const error = useTypedSelector(state => state.identity.error);
    const loader = useTypedSelector(state => state.identity.loading);

    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }
    const handleSnackClose = () => {
        setOpenSnack(false);
    };

    useEffect(() => {
        if (error.length > 0) {
            setOpenSnack(true);
        }
        return function cleanup() {
            setOpenSnack(false);
        };
    }, [error]);

    const initialValues: ILoginForm = {
        email: "",
        password: ""
    }

    const onHandleSubmit = async (values : ILoginForm, actions : FormikHelpers<ILoginForm>) => {
        var request : ILoginFormServer = {
            email: values.email,
            password: values.password,
            isstayonline: isstayonline,
        }
        try {
            await loginUser(request);
            setOpenSnack(true);
            fixnav("/");
        } catch (error) {          
            setOpenSnack(true);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateLogin,
        onSubmit: onHandleSubmit,
    });
    
    const { errors, touched, handleChange, handleSubmit } = formik; 

    return (
        <Container maxWidth="sm">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                error !== null && error !== undefined && error.length > 0 ? 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                            <AlertTitle>Login</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Login</AlertTitle>
                            You successfull registered
                        </Alert>
                    </Snackbar>
            }
            <Box sx={{display: "flex", flexDirection: "column", p:4}}>
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                            <h2>Authorizate</h2>
                            <FormikField type="email"
                                field={"email"}
                                placeholder="Enter email"
                                error={errors.email}
                                touched={touched.email}
                                onChange={handleChange}/>   
                            <FormikField type="password"
                                field={"password"}
                                placeholder="Enter password"
                                error={errors.password}
                                touched={touched.password}
                                onChange={handleChange}/>  
                            <Box sx={{display: "flex", gap: "0.5rem", alignItems: "center"}}>
                                                <h3>Stay online</h3>
                                                <Checkbox checked={isstayonline} onClick={() => {
                                                    if (isstayonline) {
                                                        setonline(false);
                                                    }
                                                    else {
                                                        setonline(true);
                                                    }
                                                }} />
                                            </Box>                      
                            <Box sx={{display: "flex", justifyContent: "end", alignItems: "center", gap: "1rem"}}>
                                <Button variant="contained" type="submit" onClick={handleChange}><h3>Login</h3></Button>
                            </Box>
                            <Button variant="text" onClick={() => {fixnav("/register")}}><h4>Create new account</h4></Button>
                        </Box>
                    </Form>
                </FormikProvider>
            </Box>
        </Container>
    )
}

export default LoginUser;   

