import { Box, Container, Alert, AlertTitle } from "@mui/material";
import React from "react";

const Rights : React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                <Alert severity="success" sx={{display: "flex", justifyContent: "center"}}>
                    <AlertTitle><h2>Privacy & Terms</h2></AlertTitle>
                    <h3>All rights protected</h3>
                </Alert>
                <h3>If you do not agree, write to us</h3>
            </Box>
        </Container>
    )
}

export default Rights;