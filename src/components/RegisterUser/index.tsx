import { PhotoCamera } from "@mui/icons-material";
import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import { Alert, AlertTitle, Backdrop, Box, Button, Checkbox, CircularProgress, Container, Divider, IconButton, Snackbar, Stack, styled, TextField } from "@mui/material";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IRegisterForm, IRegisterFormServer, validate } from "../../store/reducers/identityReducer/types";
import FormikField from "../common/FormikField";
import FormikFieldCountry from "../common/FormikFieldCountry";
import FormikFieldGender from "../common/FormikFieldGender";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import isWeekend from 'date-fns/isWeekend';
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";

const Input = styled('input')({
    display: 'none',
  });

const RegisterUser : React.FC = () => {

    const [isstayonline, setonline] = useState(false);
    const [valueDate, setValueDate] = React.useState<Date | null>(new Date());
    const [avatarState, setAvatarState] = useState("https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg");
    const [avatarFile, setAvatarFile] = useState(null);
    const [openSnack, setOpenSnack] = React.useState(false);

    const error = useTypedSelector(state => state.identity.error);
    const loader = useTypedSelector(state => state.identity.loading);

    const {registerUser} = useActions();

    const navigate = useNavigate();

    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    const handleSnackClose = () => {
        setOpenSnack(false);
    };

    const onChangeAvatar = (event: any) => {
        setAvatarFile(event.target.files[0]);
        setAvatarState(URL.createObjectURL(event.target.files[0]))
    }

    useEffect(() => {
        if (error.length > 0) {
            setOpenSnack(true);
        }

        return function cleanup () {}
    }, [error]);

    const initialValues : IRegisterForm =
    {
        name: "",
        surname: "",
        nickname: "",
        email: "",
        phone: "",
        country: "",
        gender: "",
        password: "",
        confPassword: "",
    }

    const onHandleSubmit = async (values : IRegisterForm, actions : FormikHelpers<IRegisterForm>) => {
        if (avatarFile === null) {
            return;
        }

        var request : IRegisterFormServer =
            {
                name: values.name,
                surname: values.surname,
                nickname: values.nickname,
                email: values.email,
                phone: values.phone,
                country: values.country,
                birthday: valueDate,
                gender: values.gender,
                password: values.password,
                avatar: avatarFile,
                isstayonline: isstayonline,
            };
        try {
            await registerUser(request);
            setOpenSnack(true);
            fixnav("/");
        } catch (error) {
            setOpenSnack(true);
        }
    }

    

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validate,
        onSubmit: onHandleSubmit,
    });
    
    const { errors, touched, handleChange, handleSubmit } = formik;  

    return (
        <Container maxWidth="lg">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                error !== null && error !== undefined && error.length > 0 ? 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                            <AlertTitle>Register</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Register</AlertTitle>
                            You successfull registered
                        </Alert>
                    </Snackbar>
            }
            
            <Box sx={{display: "flex", flexDirection: "column"}}>
            <FormikProvider value={formik}>
                  <Form onSubmit={handleSubmit}>


                    <Container maxWidth="sm">
                        <Box sx={{display: "flex", flexDirection: "column", p:4, borderRadius: "0.2rem 0.2rem 1rem 1rem"}}>
                            <Stack
                                direction="column"
                                divider={
                                    <Divider orientation="horizontal"/>                
                                }
                                spacing={8}>
                                    <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                                        <h2>Enter NSN</h2>
                                        <FormikField type="text"
                                            field={"name"}
                                            placeholder="Enter name"
                                            error={errors.name}
                                            touched={touched.name}
                                            onChange={handleChange}/>
                                        <FormikField type="text"
                                            field={"surname"}
                                            placeholder="Enter surname"
                                            error={errors.surname}
                                            touched={touched.surname}
                                            onChange={handleChange}/>  
                                        <FormikField type="text"
                                            field={"nickname"}
                                            placeholder="Enter nickname"
                                            error={errors.nickname}
                                            touched={touched.nickname}
                                            onChange={handleChange}/>
                                    </Box>
                                    <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                                        <h2>Enter Personal Data</h2>
                                        <FormikField type="email"
                                            field={"email"}
                                            placeholder="Enter email"
                                            error={errors.email}
                                            touched={touched.email}
                                            onChange={handleChange}/>
                                        <FormikField type="text"
                                            field={"phone"}
                                            placeholder="Enter phone"
                                            error={errors.phone}
                                            touched={touched.phone}
                                            onChange={handleChange}/>
                                        <FormikFieldGender
                                            field={"gender"}
                                            placeholder="Enter gender"
                                            error={errors.gender}
                                            touched={touched.gender}
                                            onChange={handleChange}/>
                                        <FormikFieldCountry
                                            field={"country"}
                                            placeholder="Enter country"
                                            error={errors.country}
                                            touched={touched.country}
                                            onChange={handleChange}/>                                   
                                    </Box>
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
                                    <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                                        <h2>Pin avatar</h2>
                                        <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                                            <img src={avatarState} alt="avatar" width={300} height={300} style={{objectFit: "cover"}} />
                                        </Box>
                                        <label htmlFor="icon-button-file" style={{textAlign: "center"}}>
                                            <Input accessKey="image/*" id="icon-button-file" type="file" onChange={onChangeAvatar} />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera sx={{fontSize: "3rem"}} />
                                            </IconButton>
                                        </label>
                                        {
                                            avatarFile === null ? <p style={{color: "red"}}>Upload image</p> : null
                                        }
                                        
                                    </Box>
                                    <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                                        <h2>Enter Password</h2>
                                        <FormikField type="password"
                                            field={"password"}
                                            placeholder="Enter password"
                                            error={errors.password}
                                            touched={touched.password}
                                            onChange={handleChange}/>  
                                        <FormikField type="password"
                                            field={"confPassword"}
                                            placeholder="Enter Confirm password"
                                            error={errors.confPassword}
                                            touched={touched.confPassword}
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
                                            <Button variant="contained" type="submit" onClick={handleChange}><h3>Register</h3></Button>
                                        </Box>
                                        <Button variant="text" onClick={() => {fixnav("/login")}}><h4>I have an account</h4></Button>
                                    </Box>
                            </Stack>  
                        </Box>
                    </Container>
                  </Form>
                </FormikProvider>
            </Box>
        </Container>
    )
}

export default RegisterUser;