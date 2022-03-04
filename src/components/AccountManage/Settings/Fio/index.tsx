import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Container, Box, Alert, AlertTitle, Backdrop, CircularProgress, Snackbar, Button, TextField } from "@mui/material";
import { isWeekend } from "date-fns";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import FormikField from "../../../common/FormikField";
import FormikFieldCountry from "../../../common/FormikFieldCountry";
import FormikFieldGender from "../../../common/FormikFieldGender";
import { IFioForm, IFioFormServer, validateFio } from "./types";


const UpdateFio : React.FC = () => {

    const navigate = useNavigate();
    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    const user = useTypedSelector(state => state.identity.profile);
    const error = useTypedSelector(state => state.identity.error);
    const loader = useTypedSelector(state => state.identity.loading);

    const [openSnack, setOpenSnack] = React.useState(false);
    const [valueDate, setValueDate] = React.useState<Date | null>(new Date());

    const {updateFioUser} = useActions();

    useEffect(() => {

        if (user !== null) {
            setValueDate(user.birthDay);
        }

        return function cleanup() {};
    }, [user]);

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


    const initialValues: IFioForm = {
        name: "",
        surname: "",
        nickname: "",
        birthDay: null,
        gender: "",
        country: ""
    }

    const onHandleSubmit = async (values : IFioForm, actions : FormikHelpers<IFioForm>) => {
        if (user !== null) {    
            var request : IFioFormServer = {
                findEmail: user.email,
                name: values.name.length === 0 ? user.name : values.name,
                surname: values.surname.length === 0 ? user.surname : values.surname,
                nickname: values.nickname.length === 0 ? user.nickname : values.nickname,
                birthDay: valueDate === null ? user.birthDay : valueDate,
                gender: values.gender.length === 0 ? user.gender : values.gender,
                country: values.country.length === 0 ? user.country : values.country,
            }
            try {
                await updateFioUser(request);
                console.log(request)
                setOpenSnack(true);
                window.scrollTo(0,0);
            } catch (error) {          
                setOpenSnack(true);
            }
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateFio,
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
                            <AlertTitle>Change fio</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Change fio</AlertTitle>
                            Change fio successfully
                        </Alert>
                    </Snackbar>
            }
            <Container maxWidth="sm">
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                            <h2>Change fio</h2>
                            <FormikField type="text"
                                field={"name"}
                                value={user?.name}
                                placeholder="Enter name"
                                error={errors.name}
                                touched={touched.name}
                                onChange={handleChange}/>
                            <FormikField type="text"
                                field={"surname"}
                                value={user?.surname}
                                placeholder="Enter surname"
                                error={errors.surname}
                                touched={touched.surname}
                                onChange={handleChange}/>  
                            <FormikField type="text"
                                field={"nickname"}
                                value={user?.nickname}
                                placeholder="Enter nickname"
                                error={errors.nickname}
                                touched={touched.nickname}
                                onChange={handleChange}/>
                            <FormikFieldGender
                                field={"gender"}
                                value={user?.gender}
                                placeholder="Enter gender"
                                error={errors.gender}
                                touched={touched.gender}
                                onChange={handleChange}/>
                            <FormikFieldCountry
                                field={"country"}
                                value={user?.country}
                                placeholder="Enter country"
                                error={errors.country}
                                touched={touched.country}
                                onChange={handleChange}/> 
                            <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                                <h2>Select your birth day</h2>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker<Date>
                                        
                                        orientation="landscape"
                                        openTo="day"
                                        value={valueDate}
                                        shouldDisableDate={isWeekend}
                                        onChange={(newValue : any) => {
                                        setValueDate(newValue);
                                        }}
                                        renderInput={(params : any) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>
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

export default UpdateFio;