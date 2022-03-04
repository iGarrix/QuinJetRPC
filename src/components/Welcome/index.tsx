
import { Alert, Box, Button, Container, Divider, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import VerifiedIcon from '@mui/icons-material/Verified';

const Welcome : React.FC = () => {

    const user = useTypedSelector(state => state.identity.profile);
    const navigate = useNavigate();

    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    return (
        <div style={{overflowX: "hidden"}}>
            <Container maxWidth="lg">
                <Stack
                    direction="column"
                    divider={<Divider orientation="horizontal" flexItem />}
                    spacing={6}>
                        {
                            user === null ?
                            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                <Alert severity="info" sx={{p:1, display: "flex", alignItems: "center"}}>
                                    <Box sx={{display: "flex", alignItems: "center", gap: "1rem"}}>
                                        <h3>Log in or register new account for find a work</h3>
                                        <Box sx={{display: "flex", alignItems: "center", gap: "0.1rem"}}>
                                            <Button variant="text" onClick={() => {navigate("/login")}}><h3>I have an account</h3></Button>
                                            <Divider/>
                                            <Button variant="text" onClick={() => {navigate("/register")}}><h3>Create new account</h3></Button>
                                        </Box> 
                                    </Box>             
                                </Alert>     
                            </Box>
                            : null
                        }
                        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                            <h2 style={{display: "flex", alignItems: "center", gap: "1rem"}}>Popularity specialists <VerifiedIcon color="primary"/></h2>   
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                           

                        </Box>
                </Stack>          
            </Container>
        </div>
    )
}

export default Welcome;