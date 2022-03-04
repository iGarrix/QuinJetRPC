import { Container, Box, Alert, AlertTitle, Backdrop, CircularProgress, Snackbar, Button } from "@mui/material";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import FormikField from "../../../common/FormikField";
import { validateSocialLink } from "../Sociallink/types";
import { IPhoneForm, IPhoneFormServer, validatePhone } from "./types";


const UpdatePhone : React.FC = () => {

    const navigate = useNavigate();
    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    const user = useTypedSelector(state => state.identity.profile);
    const error = useTypedSelector(state => state.identity.error);
    const loader = useTypedSelector(state => state.identity.loading);

    const [openSnack, setOpenSnack] = React.useState(false);

    const {updatePhoneUser} = useActions();

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


    const initialValues: IPhoneForm = {
        phone: "",
    }

    const onHandleSubmit = async (values : IPhoneForm, actions : FormikHelpers<IPhoneForm>) => {
        if (user !== null) {    
            var request : IPhoneFormServer = {
                findEmail: user.email,
                phone: values.phone,
            }
            try {
                await updatePhoneUser(request);
                setOpenSnack(true);
            } catch (error) {          
                setOpenSnack(true);
            }
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validatePhone,
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
                            <AlertTitle>Change phone</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Change phone</AlertTitle>
                            Change phone successfully
                        </Alert>
                    </Snackbar>
            }
            <Container maxWidth="sm">
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                            <h2>Change phone</h2>
                            <FormikField type="text"
                                field={"phone"}
                                value={user?.phone}
                                placeholder="Enter phone"
                                error={errors.phone}
                                touched={touched.phone}
                                onChange={handleChange}/>                 
                            <Box sx={{display: "flex", justifyContent: "end", alignItems: "center", gap: "1rem"}}>
                                <Button variant="contained" type="submit" onClick={handleChange}><h3>Change</h3></Button>
                            </Box>
                        </Box>
                    </Form>
                </FormikProvider>
            </Container>
        </Box>
    )
}

export default UpdatePhone;