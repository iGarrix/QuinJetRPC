import { Alert, Box, Button, Container, Divider, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const About : React.FC = () => {

    const navigate = useNavigate();

    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    return (
        <div style={{overflowX: "hidden"}}>
            <Container maxWidth="lg">           
                <Alert severity="error" sx={{display: 'flex', justifyContent: "center", mb: 10}}><h3>This web portfolio will don't not to work in Russia through political and warrior reasons</h3></Alert>
                <h2 style={{textAlign: "center"}}>About QUIN JET</h2>
                <br />
                <Stack
                    direction="column"
                    divider={
                        <Divider orientation="horizontal"/>                
                    }
                    spacing={8}>
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
                            <h3>Quinjet - is website, for finding specialists or get up to work</h3>
                            <h3>Here you can find a specialist in any field by searching for knowledge!</h3>
                            <h3>But if you are looking for a job, you can register and prove yourself !</h3>                                                     
                            <Alert severity="success" sx={{display: 'flex', justifyContent: "center"}}><h3>You can to register for website for a get up to work</h3></Alert>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
                            <h3>There may be fakes or clones on the site, in most cases moderation will clear them. Real experts will be marked with special symbols.
                            There is also a rating by which you can find the best professionals. The site has a large number of search tools to find a good caretaker.</h3>                                                     
                            <Alert severity="success" sx={{display: 'flex', justifyContent: "center"}}><h3>Trust only verified specialists</h3></Alert>
                        </Box>             
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
                            <h3>In-depth registration, filling, verified, search orders information at the link</h3>  
                            <Button onClick={() => {fixnav("/terms")}}><h4>TERMS</h4></Button>                                                 
                        </Box>
                </Stack>  
                
            </Container>
        </div>
    )
}

export default About;