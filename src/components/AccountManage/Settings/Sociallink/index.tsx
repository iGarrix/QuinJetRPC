import { Container, Box, Alert, AlertTitle, Backdrop, CircularProgress, Snackbar, Button } from "@mui/material";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { validateLogin } from "../../../../store/reducers/identityReducer/types";
import FormikField from "../../../common/FormikField";
import { ISocialLink, ISocialLinkServer, validateSocialLink } from "./types";


const Sociallink : React.FC = () => {

    const navigate = useNavigate();
    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    const user = useTypedSelector(state => state.identity.profile);
    const error = useTypedSelector(state => state.identity.error);
    const loader = useTypedSelector(state => state.identity.loading);

    const [openSnack, setOpenSnack] = React.useState(false);

    const {updateSocialLinkUser} = useActions();

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


    const initialValues: ISocialLink = {
        slot1: "",
        slot2: "",
        slot3: ""
    }

    const onHandleSubmit = async (values : ISocialLink, actions : FormikHelpers<ISocialLink>) => {
        if (user !== null) {    
            var request : ISocialLinkServer = {
                findEmail: user.email,
                slot1: values.slot1.length === 0 ? user.socialSlot1 : values.slot1,
                slot2: values.slot2.length === 0 ? user.socialSlot2 : values.slot2,
                slot3: values.slot3.length === 0 ? user.socialSlot3 : values.slot3
            }
            try {
                await updateSocialLinkUser(request);
                setOpenSnack(true);
            } catch (error) {          
                setOpenSnack(true);
            }
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSocialLink,
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
                            <AlertTitle>Adding social links</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Adding social links</AlertTitle>
                            Adding new social links
                        </Alert>
                    </Snackbar>
            }
            <Container maxWidth="sm">
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                            <h2>Add social links</h2>
                            <FormikField type="text"
                                field={"slot1"}
                                value={user?.socialSlot1}
                                placeholder="Enter slot"
                                error={errors.slot1}
                                touched={touched.slot1}
                                onChange={handleChange}/>
                            <FormikField type="text"
                                field={"slot2"}
                                value={user?.socialSlot2}
                                placeholder="Enter slot"
                                error={errors.slot2}
                                touched={touched.slot2}
                                onChange={handleChange}/>  
                            <FormikField type="text"
                                field={"slot3"}
                                value={user?.socialSlot3}
                                placeholder="Enter slot"
                                error={errors.slot3}
                                touched={touched.slot3}
                                onChange={handleChange}/>                    
                            <Box sx={{display: "flex", justifyContent: "end", alignItems: "center", gap: "1rem"}}>
                                <Button variant="contained" type="submit" onClick={handleChange}><h3>Add</h3></Button>
                            </Box>
                        </Box>
                    </Form>
                </FormikProvider>
            </Container>
        </Box>
    )
}

export default Sociallink;