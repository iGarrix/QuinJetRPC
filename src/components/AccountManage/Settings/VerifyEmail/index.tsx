import { Container, Box, Alert, AlertTitle, Backdrop, CircularProgress, Snackbar, Button, Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

const VerifyEmail : React.FC = () => {

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

    const {verifyEmailUser} = useActions();

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

    useEffect(() => {
        if (user !== null) {
            if (user.emailConfirmed) {
                fixnav("/profile/settings");
            }
        }
    }, [user]);

    const OnHandle = async () => {
        if (user !== null) {    
            try {
                await verifyEmailUser(user.email);
                setOpenSnack(true);
                setTimeout(() => {fixnav("/profile");}, 3000);
            } catch (error) {          
                setOpenSnack(true);
            }
        }
    }


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
                            <AlertTitle>Confirm email</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                    : 
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                            <AlertTitle>Confirm email</AlertTitle>
                            Confirm email successfully
                        </Alert>
                    </Snackbar>
            }
            <Container maxWidth="sm">
                <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                    <h2>Confirm email</h2>
                    <Alert severity="info">
                        <h3>Actions with email address in development, so address verification is simplified!</h3>
                    </Alert>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box sx={{display: "flex", gap: ".5rem", alignItems: "center"}}>
                            <Checkbox
                                checked={agree}
                                onChange={() => {setAgree(!agree)}}
                                inputProps={{ 'aria-label': 'controlled' }}/>
                            <h3>I agree</h3>
                        </Box>
                        <Button disabled={!agree} variant="outlined" type="submit" onClick={async() => {await OnHandle();}}>
                            <h3>Confirmed</h3>
                        </Button>
                    </Box>                
                </Box>
            </Container>
        </Box>
    )
}

export default VerifyEmail;