import { Container, Box, Alert, AlertTitle, Backdrop, CircularProgress, Snackbar, Button } from "@mui/material";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import FormikField from "../../../common/FormikField";
import { ISkillsForm, ISkillsFormServer, validateSkills } from "./types";


const UpdateSkills : React.FC = () => {

    const navigate = useNavigate();
    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    const user = useTypedSelector(state => state.identity.profile);
    const error = useTypedSelector(state => state.identity.error);
    const loader = useTypedSelector(state => state.identity.loading);

    const [openSnack, setOpenSnack] = React.useState(false);

    const {updateSkillsUser} = useActions();

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


    const initialValues: ISkillsForm = {
        quote: "",
        language: "",
        skills: ""
    }

    const onHandleSubmit = async (values : ISkillsForm, actions : FormikHelpers<ISkillsForm>) => {
        if (user !== null) {   
            var request : ISkillsFormServer = {
                findEmail: user.email,
                quote: values.quote.length === 0 ? user.quote : values.quote,
                language: values.language.length === 0 ? user.language : values.language,
                skills: values.skills.length === 0 ? user.skills : values.skills,
            }
            console.log(request); 
            try {
                await updateSkillsUser(request);
                setOpenSnack(true);
            } catch (error) {          
                setOpenSnack(true);
            }
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSkills,
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
                            <AlertTitle>Change skills</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Change skills</AlertTitle>
                            Change skills successfully
                        </Alert>
                    </Snackbar>
            }
            <Container maxWidth="sm">
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                            <h2>Change skills</h2>
                            <FormikField type="text"
                                field={"quote"}
                                value={user?.quote}
                                placeholder="Enter quote"
                                error={errors.quote}
                                touched={touched.quote}
                                onChange={handleChange}/>  
                            <FormikField type="text"
                                field={"language"}
                                value={user?.language}
                                placeholder="Enter language"
                                error={errors.language}
                                touched={touched.language}
                                onChange={handleChange}/>  
                            <FormikField type="text"
                                field={"skills"}
                                value={user?.skills}
                                placeholder="Enter skills"
                                error={errors.skills}
                                touched={touched.skills}
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

export default UpdateSkills;