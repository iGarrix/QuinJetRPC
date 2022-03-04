import { Alert, Box, Container, Divider, Stack } from "@mui/material";
import React from "react";


const Index : React.FC = () => {

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Stack direction="column" divider={<Divider/>} spacing={3}>
                <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
                    <h2 style={{textAlign: "center"}}>Personal data</h2>
                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                        <h3>Your personal data includes the following data:</h3>
                        <Box sx={{display: "flex", flexDirection: "column", gap: ".5rem"}}>
                            <h3>1. Fio data (Name, Surname, Nickname, Gender, Country, Birth Day)</h3>
                            <h3>2. Your phone</h3>
                            <h3>3. Work & Study (Geolocation, names I.T.D)</h3>
                            <h3>4. About you (Quote, understanding languages)</h3>
                        </Box>
                        
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
                    <h2 style={{textAlign: "center"}}>Social links</h2>
                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column"}}>
                        <h3>This tab contains data for communication with you through social networks</h3>
                        <h3>You have an 3 slots for social links</h3> 
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
                    <h2 style={{textAlign: "center"}}>Business data</h2>
                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column"}}>
                        <h3>TIf you have worked on your profile, you can get official confirmations in this tab</h3>
                        <h3>You can also confirm your email</h3> 
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
                    <h2 style={{textAlign: "center"}}>Security</h2>
                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column"}}>
                        <h3>With the help of the security tab you can change your e-mail, password</h3>
                    </Box>
                    <Alert severity="error">
                        <h3>Be careful with actions related to deleting an account</h3>
                    </Alert>
                </Box>
            </Stack>
        </Box>
    )
}

export default Index;