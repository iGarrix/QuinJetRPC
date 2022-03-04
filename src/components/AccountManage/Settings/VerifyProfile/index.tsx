import { Container, Box, Alert, AlertTitle, Backdrop, CircularProgress, Snackbar, Button, Divider, Stack, Step, StepContent, StepLabel, Stepper, Typography, Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { StatusUser } from "../../../../httpvariable";
import { IVerifyFormServer } from "./types";


const VerifyProfile : React.FC = () => {

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

    const {updateStatusUser} = useActions();

    const handleSnackClose = () => {
        setOpenSnack(false);
    };

    const SendStatements = async () => {
        if (user !== null) {    
            var request : IVerifyFormServer = {
                findEmail: user.email,
                status: StatusUser.Verify,
            }
            try {
                await updateStatusUser(request);
                setOpenSnack(true);
                setTimeout(() => {fixnav("/profile");}, 3000);
            } catch (error) {          
                setOpenSnack(true);
            }
        }
    }

    useEffect(() => {
        if (error.length > 0) {
            setOpenSnack(true);
        }
        return function cleanup() {
            setOpenSnack(false);
        };
    }, [error]);

    useEffect(() => {
        if (user !== null) {
            if (user.status === StatusUser.Verify) {
                fixnav("/profile/settings");
            }
        }
    }, [user]);

    const stepVerify = [
        {
          label: 'Age',
          description: `You must be 18 years old`,
        },
        {
          label: 'Fillings',
          description:
            'You must have a profile completed by 100%',
        },
        {
          label: 'Email',
          description: `You must have a verified email`,
        },
        {
          label: 'Reputation',
          description: `You must have more than 1,000 reputations. If third-party users create a clone of your profile, contact moderation, or provide true links to your social networks, otherwise your account will be verified`,
        },
      ];

    const [activeStepVerify, setActiveStepVerify] = React.useState(0);

    const handleNextVerify = (index: number) => {
        if (index === stepVerify.length - 1) {
            setActiveStepVerify(0);
            return;
        }
        setActiveStepVerify((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBackVerify = () => {
      setActiveStepVerify((prevActiveStep) => prevActiveStep - 1);
    };

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
                            <AlertTitle>Verify profile</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Verify profile</AlertTitle>
                            Your profile successully verified
                        </Alert>
                    </Snackbar>
            }
            <Container maxWidth="sm">
                <Stack direction="column" divider={<Divider />} spacing={2.5}>
                    <h2>Contract</h2>
                    <Box sx={{p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>  
                        <h3>These are the conditions that must be met to be officially confirmed by a specialist</h3>
                        <h3>You have to be:</h3>
                        <Stepper activeStep={activeStepVerify} orientation="vertical">
                            {stepVerify.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel>
                                    <h3>{step.label}</h3>
                                </StepLabel>
                                <StepContent>
                                <h4 style={{fontWeight: 500}}>{step.description}</h4>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {handleNextVerify(index)}}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        <h5>{index === stepVerify.length - 1 ? 'Finish' : 'Continue'}</h5>
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBackVerify}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        <h5>Back</h5>
                                    </Button>
                                    </div>
                                </Box>
                                </StepContent>
                            </Step>
                            ))}
                        </Stepper>
                    </Box>
                        <Alert variant="filled" severity="error">
                            <h3>If you violate the contract, you lose official confirmation and reputation</h3>
                        </Alert>
                        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", p:1}}>
                            <Box sx={{display: "flex", gap: ".5rem", alignItems: "center"}}>
                                <Checkbox
                                    checked={agree}
                                    onChange={() => {setAgree(!agree)}}
                                    inputProps={{ 'aria-label': 'controlled' }}/>
                                <h3>I agree</h3>
                            </Box>
                            <Button disabled={!agree} variant="outlined" onClick={async () => {await SendStatements()}}>
                                <h3>Send a statements</h3>
                            </Button>
                        </Box>
                </Stack>

            </Container>
        </Box>
    )
}

export default VerifyProfile;