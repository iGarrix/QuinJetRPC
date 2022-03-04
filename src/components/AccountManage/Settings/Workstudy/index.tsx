import { Container, Box, Alert, AlertTitle, Backdrop, CircularProgress, Snackbar, Button } from "@mui/material";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import FormikField from "../../../common/FormikField";
import { IWorkstudyForm, IWorkstudyFormServer, validateWorkstudy } from "./types";


const Workstudy : React.FC = () => {

    const navigate = useNavigate();
    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    const user = useTypedSelector(state => state.identity.profile);
    const error = useTypedSelector(state => state.identity.error);
    const loader = useTypedSelector(state => state.identity.loading);

    const [openSnack, setOpenSnack] = React.useState(false);

    const {updateWorkstudyUser} = useActions();

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


    const initialValues: IWorkstudyForm = {
        jobGeo: "",
        studyGeo: "",
        jobName: "",
        stydyName: ""
    }

    const onHandleSubmit = async (values : IWorkstudyForm, actions : FormikHelpers<IWorkstudyForm>) => {
        if (user !== null) {    
            var request : IWorkstudyFormServer = {
                findEmail: user.email,
                jobGeo: values.jobGeo.length === 0 ? user.jobGeolocation : values.jobGeo,
                studyGeo: values.studyGeo.length === 0 ? user.studyGeolocation : values.studyGeo,
                jobName: values.jobName.length === 0 ? user.jobName : values.jobName,
                stydyName: values.stydyName.length === 0 ? user.studyName : values.stydyName,
            }
            try {
                await updateWorkstudyUser(request);
                setOpenSnack(true);
            } catch (error) {          
                setOpenSnack(true);
            }
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateWorkstudy,
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
                            <AlertTitle>Work & study</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Work & study</AlertTitle>
                            Work and study successfull updated
                        </Alert>
                    </Snackbar>
            }
            <Container maxWidth="sm">
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                            <h2>Change work & study</h2>
                            <FormikField type="text"
                                field={"jobGeo"}
                                value={user?.jobGeolocation}
                                placeholder="Enter job geolocation"
                                error={errors.jobGeo}
                                touched={touched.jobGeo}
                                onChange={handleChange}/> 
                            <FormikField type="text"
                                field={"jobName"}
                                value={user?.jobName}
                                placeholder="Enter job"
                                error={errors.jobName}
                                touched={touched.jobName}
                                onChange={handleChange}/>
                            <FormikField type="text"
                                field={"studyGeo"}
                                value={user?.studyGeolocation}
                                placeholder="Enter study geolocation"
                                error={errors.studyGeo}
                                touched={touched.studyGeo}
                                onChange={handleChange}/>
                            <FormikField type="text"
                                field={"stydyName"}
                                value={user?.studyName}
                                placeholder="Enter study"
                                error={errors.stydyName}
                                touched={touched.stydyName}
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

export default Workstudy;