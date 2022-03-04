import { Container, Box, Alert, AlertTitle, Backdrop, CircularProgress, Snackbar, Button, Checkbox } from "@mui/material";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import FormikField from "../../../common/FormikField";
import { IRemoveProfileForm, IRemoveProfileServer, validateRemoveProfile } from "./types";


const RemoveProfile : React.FC = () => {

    const navigate = useNavigate();
    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    const user = useTypedSelector(state => state.identity.profile);
    const error = useTypedSelector(state => state.identity.error);
    const loader = useTypedSelector(state => state.identity.loading);

    const [openSnack, setOpenSnack] = React.useState(false);
    const [agree, setAgree] = React.useState(false);

    const {removeUser} = useActions();

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


    const initialValues: IRemoveProfileForm = {
        password: "",
    }

    const onHandleSubmit = async (values : IRemoveProfileForm, actions : FormikHelpers<IRemoveProfileForm>) => {
        if (user !== null) {    
            var request : IRemoveProfileServer = {
                email: user.email,
                password: values.password,
            }

            try {
                await removeUser(request);
                setOpenSnack(true);
            } catch (error) {          
                setOpenSnack(true);
            }
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateRemoveProfile,
        onSubmit: onHandleSubmit,
    });
    
    const { errors, touched, handleChange, handleSubmit } = formik; 

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%"}}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                error !== null && error !== undefined && error.length > 0 ? 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                            <AlertTitle>Remove account</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Remove account</AlertTitle>
                            Remove account successfully
                        </Alert>
                    </Snackbar>
            }
            <Container maxWidth="sm">
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                            <h2>Remove profile</h2>
                            <Alert variant="filled" severity="error">
                                <h3>If you delete your profile, you will never be able to restore it again!</h3>
                            </Alert>
                            <FormikField type="text"
                                field={"password"}
                                placeholder="Enter password"
                                error={errors.password}
                                touched={touched.password}
                                onChange={handleChange}/>
                            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Box sx={{display: "flex", gap: ".5rem", alignItems: "center"}}>
                                    <Checkbox
                                        checked={agree}
                                        onChange={() => {setAgree(!agree)}}
                                        inputProps={{ 'aria-label': 'controlled' }}/>
                                    <h3>I agree</h3>
                                </Box>
                                <Button disabled={!agree} variant="outlined" type="submit" onClick={handleChange}>
                                    <h3>Remove</h3>
                                </Button>
                            </Box>                
                        </Box>
                    </Form>
                </FormikProvider>
            </Container>
        </Box>
    )
}

export default RemoveProfile;