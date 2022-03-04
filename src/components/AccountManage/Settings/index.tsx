import { Box, Button, Container, Divider, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { StatusUser } from "../../../httpvariable";

const Settings : React.FC = () => {

    const navigate = useNavigate();
    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    const user = useTypedSelector(state => state.identity.profile);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Stack direction="column" spacing={4}>
                            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                <h3 style={{textTransform: "uppercase", display: "flex", alignItems: "center", paddingLeft: "5%"}}><PersonIcon /> Personal</h3>
                                <Button sx={{boxShadow: 0}} variant="contained" color="primary" onClick={() => {fixnav("fio")}}><h3>Fio</h3></Button>
                                <Button sx={{boxShadow: 0}} variant="contained" color="primary" onClick={() => {fixnav("phone")}}><h3>Phone</h3></Button>
                                <Button sx={{boxShadow: 0}} variant="contained" color="primary" onClick={() => {fixnav("workstudy")}}><h3>Work & Study</h3></Button>
                                <Button sx={{boxShadow: 0}} variant="contained" color="primary" onClick={() => {fixnav("skills")}}><h3>Skills</h3></Button>
                            </Box>
                            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                            <h3 style={{textTransform: "uppercase", display: "flex", alignItems: "center" , paddingLeft: "5%"}}><AddLinkIcon /> Social links</h3>
                                <Button sx={{boxShadow: 0}} variant="contained" color="inherit" onClick={() => {fixnav("sociallinks")}}><h3>Change social links</h3></Button>
                            </Box>
                            {
                                !user?.emailConfirmed || (user?.status !== undefined && user?.status === StatusUser.Unverify) ?
                                <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                    <h3 style={{textTransform: "uppercase", display: "flex", alignItems: "center" , paddingLeft: "5%"}}><AltRouteIcon /> Business account</h3>
                                    {
                                        user?.emailConfirmed ? null : 
                                        <Button sx={{boxShadow: 0}} variant="contained" color="primary" onClick={() => {fixnav("verifyemail")}}><h3>Confirm email</h3></Button>
                                    }
                                    {
                                        user?.status !== undefined && user?.status === StatusUser.Unverify ?
                                        <Button sx={{boxShadow: 0}} variant="contained" color="primary" onClick={() => {fixnav("verifyprofile")}}><h3>Verify profile</h3></Button> : null
                                    }
                                </Box> : null

                            }
                            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                <h3 style={{textTransform: "uppercase", display: "flex", alignItems: "center" , paddingLeft: "5%"}}><AdminPanelSettingsIcon /> Security</h3>
                                <Button sx={{boxShadow: 0}} variant="contained" color="error" onClick={() => {fixnav("email")}}><h3>Email</h3></Button>
                                <Button sx={{boxShadow: 0}} variant="contained" color="error" onClick={() => {fixnav("password")}}><h3>Password</h3></Button>
                                <Button sx={{boxShadow: 0}} variant="contained" color="error" onClick={() => {fixnav("removeaccount")}}><h3>Remove account</h3></Button>
                            </Box>
                        </Stack>
                    </Box>              
                </Grid>
                <Grid item xs={0.2}>
                    <Divider orientation="vertical" />
                </Grid>
                <Grid item xs={8.8}>
                    <Container maxWidth="lg" sx={{height: "100%"}}>
                        <Outlet />
                    </Container>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Settings;