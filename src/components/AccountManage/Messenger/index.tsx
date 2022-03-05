import { Alert, Box, Container } from "@mui/material";
import React from "react";

const Messenger : React.FC = () => {
    
    return (
        <Container maxWidth="md">
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Alert severity="info" sx={{display: "flex", alignItems: "center"}}>
                    <h2>Messenger in development. Try to later</h2>
                </Alert>
            </Box>
        </Container>
    )
}

export default Messenger;