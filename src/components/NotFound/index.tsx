import React from "react";
import { Box, Button, Container } from "@mui/material";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { useNavigate } from "react-router-dom";

const NotFound : React.FC = () => {

    const navigate = useNavigate();

    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    return (
      <div>
          <Container maxWidth="xl" style={{height: "100vh", overflow: "hidden"}}>
              <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100%", gap: "1rem"}}>
                    <ReportGmailerrorredOutlinedIcon color="error" sx={{height: "10%", width: "10%"}} />
                    <h1 style={{fontSize: "2.5rem", color: "#f70000"}}>Oops, page not found :(</h1>
                    <h2 style={{color: "#f70000"}}>This page dont exists, can you back to work page</h2>
                    <br />
                    <Button variant="outlined" startIcon={<ArrowBackIosOutlinedIcon />} onClick={() => {fixnav("/")}}>
                        <h3>Back</h3>
                    </Button>
              </Box>
          </Container>
      </div>
    )
}

export default NotFound;