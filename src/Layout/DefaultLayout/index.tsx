import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";

const DefaultLayout : React.FC = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", overflowX: "hidden"}}>
            <div>
                <Box sx={{p:1, background: "#5999ff"}} /> 
                <Box sx={{p:1}} bgcolor="gold" /> 
                <Header />
            </div>
            <Box sx={{minHeight: "100vh", mb: 3}}>
                <Outlet/>
            </Box>
            <Footer />   
        </Box>
    )
}

export default DefaultLayout;