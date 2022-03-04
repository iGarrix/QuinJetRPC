import { Box, Container, Divider, Stack } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from "react";

import "./terms.css";

const Terms : React.FC = () => {

    const stepVerify = [
        {
          label: 'You age',
          description: `You must be 18 years old`,
        },
        {
          label: 'Filling profile',
          description:
            'You must have a profile completed by 100%',
        },
        {
          label: 'Email confirmed',
          description: `You must have a verified email`,
        },
        {
          label: 'Reputation',
          description: `You must have more than 1,000 reputations. If third-party users create a clone of your profile, contact moderation, or provide true links to your social networks, otherwise your account will be verified`,
        },
      ];


      const stepRegister = [
        {
          label: 'Enter fio and other data',
          description: `You need to entering: Name, Surname, Nickname, Birth Day, Gender, Country is required`,
        },
        {
          label: 'Enter your personal data',
          description:
            'It is a email, phone',
        },
        {
            label: 'Avatar person',
            description: `You need to pinned your avatar - face (face is not nessessary) but avatar is required`,
        },
        {
          label: 'Password & Staying online',
          description: `You need to enter new password and remember his and select to staing online for stay online or not!`,
        },
      ];


      const [activeStepVerify, setActiveStepVerify] = React.useState(0);

      const handleNextVerify = () => {
        setActiveStepVerify((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBackVerify = () => {
        setActiveStepVerify((prevActiveStep) => prevActiveStep - 1);
      };


      const [activeStepRegister, setActiveStepRegister] = React.useState(0);

      const handleNextRegister = () => {
        setActiveStepRegister((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBackRegister = () => {
        setActiveStepRegister((prevActiveStep) => prevActiveStep - 1);
      };



    return (
        <Container maxWidth="lg">
            <Stack direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={8}>

                <Box sx={{display: "flex", flexDirection: "column", gap: "2.5rem"}}>
                    <h1 style={{textAlign: "center"}}>How to get a verify?</h1>
                    <h2 style={{textAlign: "center"}}>You need the following steps to receive confirmation:</h2>
                    <Stepper activeStep={activeStepVerify} orientation="vertical">
                        {stepVerify.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                            optional={
                                index === stepVerify.length - 1 ? (
                                <Typography variant="caption"><h3>Last step</h3></Typography>
                                ) : null
                            }
                            >
                            <h3>{step.label}</h3>
                            </StepLabel>
                            <StepContent>
                            <h4 style={{fontWeight: 500}}>{step.description}</h4>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                <Button
                                    variant="outlined"
                                    onClick={handleNextVerify}
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
                <Box sx={{display: "flex", flexDirection: "column", gap: "2.5rem"}}>
                    <h1 style={{textAlign: "center"}}>How to register?</h1>
                    <h2 style={{textAlign: "center"}}>You need to jump on register page end entered next data:</h2>
                    <Stepper activeStep={activeStepRegister} orientation="vertical">
                        {stepRegister.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                            optional={
                                index === stepRegister.length - 1 ? (
                                <Typography variant="caption"><h3>Last step</h3></Typography>
                                ) : null
                            }
                            >
                            <h3>{step.label}</h3>
                            </StepLabel>
                            <StepContent>
                            <h4 style={{fontWeight: 500}}>{step.description}</h4>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                <Button
                                    variant="outlined"
                                    onClick={handleNextRegister}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    <h5>{index === stepVerify.length - 1 ? 'Finish' : 'Continue'}</h5>
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBackRegister}
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
                </Stack>
        </Container>
    )
}

export default Terms;