import React from "react";
import { Box, Button, Container, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer : React.FC = () => {


    const navigate = useNavigate();

    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    return (
        <div style={{overflowX: "hidden"}}>
            <br />
            <Box sx={{display: "flex", p:1, justifyContent: "space-between"}} bgcolor="black" color="white">
                <h4>Web portfolio have a privacy & All rights protected</h4>
                <h4>The creating in 2022 & Share to popularity</h4>
                <h4>Searching job & Get up job</h4>
                <h4>Web portfolio have a privacy & All rights protected</h4>
            </Box>
            <Container maxWidth="lg" sx={{p: 2}}>
                <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <Grid container spacing={2}>   
                        <Grid item xs={6}>
                            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                <Button variant="text" sx={{textAlign: "left"}} onClick={() => {fixnav("/terms")}}><h4>TERMS</h4></Button>
                                <Button variant="text" onClick={() => {fixnav("/about")}}><h4>ABOUT</h4></Button>
                            </Box>
                        </Grid>                     
                        <Grid item xs={6}>
                            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                <Button variant="text" onClick={() => {fixnav("/privacy")}}><h4>PRIVACY</h4></Button>
                                <Button variant="text" onClick={() => {fixnav("/protected")}}><h4>PROTECTED</h4></Button>
                            </Box>
                        </Grid>              
                    </Grid>
                    <Divider />
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
                        <a href="https://www.instagram.com/allnullable" target="_blank">
                            <Button variant="text" sx={{textAlign: "left"}}>                          
                                <h4>Instagram: https://www.instagram.com/allnullable</h4>
                            </Button>
                        </a>
                        <a href="https://github.com/iGarrix" target="_blank">
                        <Button variant="text" sx={{textAlign: "left"}}>
                            <h4>GitHub: https://github.com/iGarrix</h4>
                        </Button>
                        </a> 
                        <a href="https://vk.com/async" target="_blank">
                        <Button variant="text" sx={{textAlign: "left"}}>
                            <h4>VK: https://vk.com/async</h4>
                        </Button>
                        </a> 
                        <Button variant="text" sx={{textAlign: "left"}}>
                            <h4>Gmail: garrixdit@gmail.com</h4>
                        </Button>               
                    </Box>
                    <Divider />
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
                        <h2>NO WAR</h2>                                                     
                        <Box sx={{width: "50%"}}>
                            <Box sx={{p:2,background: "#5999ff"}} /> 
                            <Box sx={{p:2}} bgcolor="gold" />
                        </Box>    
                        <h4>Raise Funds for Ukraine’s Armed Forces</h4>
                        <h4>NBU GOVERMENT</h4>
                        <Box bgcolor="whitesmoke" sx={{p:1}}>
                            <h4>UA843000010000000047330992708</h4>
                        </Box>                         
                    </Box>
                    <br />
                </Box>
            </Container>
            
        </div>
    )
}

export default Footer;