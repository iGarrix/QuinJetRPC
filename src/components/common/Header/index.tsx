import React, { useState } from "react";
import { Alert, Avatar, Badge, Box, Button, Container, DialogContentText, Divider, Menu, Stack, Tooltip, Zoom } from "@mui/material";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { GetImageUser, StatusUser } from "../../../httpvariable";
import SettingsIcon from '@mui/icons-material/Settings';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useActions } from "../../../hooks/useActions";
import LinearProgress from '@mui/material/LinearProgress';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const Header : React.FC = () => {


    const navigate = useNavigate();

    const {logoutUser} = useActions();

    const fixnav = (path : string) => {
        window.scrollTo(0,0);
        navigate(path);
    }

    const user = useTypedSelector(state => state.identity.profile);

    const [menu, setMenu] = useState(false);
    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setMenu(true);
      };

    const toggleMenu = (toggle : boolean) => {
        setMenu(toggle);
    }



    const logout = () => {
        logoutUser();
    }

    const fillingProfile = () => {
        if (user !== null) {              
            const count = 12;
            let persent = user.jobGeolocation.length > 0 ? +1 : 0;
            persent += user.jobGeolocation.length > 0 ? 1 : 0;
            persent += user.studyGeolocation.length > 0 ? 1 : 0;
            persent += user.jobName.length > 0 ? 1 : 0;
            persent += user.studyName.length > 0 ? 1 : 0;
            persent += user.socialSlot1.length > 0 ? 1 : 0;
            persent += user.socialSlot2.length > 0 ? 1 : 0;
            persent += user.socialSlot3.length > 0 ? 1 : 0;
            persent += user.quote.length > 0 ? 1 : 0;
            persent += user.language.length > 0 ? 1 : 0;
            persent += user.skills.length > 0 ? 1 : 0;
            persent += user.socialSlot3.length > 0 ? 1 : 0;

            return Math.trunc((persent / count) * 100);
        }
        return 0;
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => {setOpen(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle sx={{display: "flex", justifyContent: "space-between"}}>
                    <h3>*Required* Reputation</h3>
                    <h3 style={{display: "flex", alignItems: "center", gap: "0.1rem"}}><StarOutlinedIcon color="primary" /> 1.000</h3>
                </DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                            <Box>
                                <h4>Rating - is required condition for get up to payable work</h4>
                                <h4>You can get a verified to typing <span style={{color: "black"}}>1.000</span> reputation!</h4>
                            </Box>
                            <Divider />
                            <Box sx={{p:1, display: "flex", alignItems: "start", gap: "0.5rem"}}>
                                {
                                    user !== null ?
                                    <Avatar alt="Remy Sharp" src={`${GetImageUser}${user.avatar}`} />
                                    :
                                    <Avatar alt="Remy Sharp" src="" />
                                }
                                <Box>
                                    <h3 style={{display: "flex", alignItems: "center", gap: "0.3rem"}}>{user?.name} {user?.surname}
                                        <Tooltip TransitionComponent={Zoom} title="This account is verified" arrow placement="top">
                                            <VerifiedIcon color="primary" sx={{fontSize: "1rem"}} />
                                        </Tooltip>
                                    </h3>
                                    <h4>{user?.nickname}</h4>
                                </Box>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setOpen(false)}} autoFocus>
                            <h4>OK</h4>
                        </Button>
                </DialogActions>
            </Dialog>


            <Container maxWidth="lg" sx={{p: 2}}>
                <Box sx={{display: "flex", width: "100%"}}>
                    <Box sx={{display: "flex", gap: "1rem"}}>
                        <Button variant="text" onClick={() => {fixnav("/")}}><h3>HOME</h3></Button>
                        <Button variant="text" onClick={() => {fixnav("/about")}}><h3>ABOUT</h3></Button>
                        <a href="https://www.economist.com/graphic-detail/2022/02/28/russians-in-every-major-city-and-region-call-for-nowar" target={"_blank"}>
                            <Button variant="text" color="success"><h3>#NO WAR</h3></Button>
                        </a>
                    </Box>
                    {
                        user === null ?
                        <Box sx={{display: "flex", gap: "1rem", marginLeft: "auto"}}>
                            <Button variant="text" startIcon={<LoginIcon />} onClick={() => {fixnav("/login")}}><h3>LOGIN</h3></Button>
                            <Button variant="text" startIcon={<PersonAddAltOutlinedIcon />} onClick={() => {fixnav("/register")}}><h3>REGISTER</h3></Button>
                        </Box>
                        :
                        <Box sx={{display: "flex", gap: "1rem", alignItems: "center", marginLeft: "auto"}}>
                            <Box sx={{display: "flex", gap: "1rem", alignItems: "center", marginLeft: "auto"}} 
                            onClick={(event : any) => {handleClick(event)}}>
                                <h4>{user.email}</h4>
                                <Avatar alt="Remy Sharp" src={`${GetImageUser}${user.avatar}`} />
                            </Box>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={menu}
                                onClose={() => {toggleMenu(false)}}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                                sx={{mt: 2}}
                            >
                                <Stack
                                    direction="column"
                                    divider={
                                        <Divider orientation="horizontal"/>                
                                    }
                                    spacing={1}
                                    sx={{minWidth: "13vw"}}>
                                        <Box onClick={() => {fixnav("/profile"); toggleMenu(false);}} sx={{p:1, display: "flex", cursor: "pointer", alignItems: "start", gap: "0.5rem", '&:hover': {
                                                        cursor: 'pointer',
                                                        backgroundColor: "whitesmoke"}}}>
                                            <Avatar alt="Remy Sharp" src={`${GetImageUser}${user.avatar}`} />
                                            <Box>
                                                <h3 style={{display: "flex", alignItems: "center", gap: "0.3rem"}}>{user.name} {user.surname}
                                                {
                                                    user.status === StatusUser.Verify ?
                                                    <Tooltip TransitionComponent={Zoom} title="This account is verified" arrow placement="top">
                                                        <VerifiedIcon color="primary" sx={{fontSize: "1rem"}} />
                                                    </Tooltip>
                                                    : null
                                                }
                                                </h3>
                                                <h4>{user.nickname}</h4>
                                            </Box>
                                        </Box>
                                        <Box sx={{display: "flex", justifyContent: "space-around"}}>                               
                                            <Button onClick={() => {fixnav("profile/messenger"); toggleMenu(false);}}>
                                                <Tooltip title={`Messenger in development!`} placement="top-start" arrow>
                                                    <ChatBubbleOutlinedIcon color="primary" />
                                                </Tooltip>                                
                                            </Button>
                                            <Button onClick={() => {setOpen(true)}}>
                                                <Tooltip title="Your rating" placement="top-start" arrow>
                                                    <h3 style={{display: "flex", alignItems: "center", gap: "0.1rem"}}><StarOutlinedIcon color="primary" /> {user.popularity}</h3>
                                                </Tooltip>  
                                            </Button>                                   
                                        </Box>
                                        {
                                            fillingProfile() < 100 ?
                                            <Box>
                                                <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem", p:2}}>
                                                    <h3>Filling profile</h3>
                                                    <Box sx={{display: "flex", flexDirection: "column"}}>
                                                        <LinearProgress variant="determinate" value={fillingProfile()} />
                                                        <h4 style={{textAlign: "center", marginTop: "0.5rem", marginBottom: 0}}>{fillingProfile()}%</h4>
                                                    </Box>
                                                </Box>  
                                                <Alert severity="info" sx={{borderRadius: 0}}>Please, fill your account!</Alert>
                                            </Box>
                                            :
                                            null
                                        }
                                        {
                                            !user.emailConfirmed ?                            
                                            <Box>
                                                <Alert severity="error" sx={{borderRadius: 0}}>Please, сonfirm your email! {user.emailConfirmed}</Alert>
                                            </Box>
                                            :
                                            null
                                        }
                                        {
                                                fillingProfile() >= 100 && user.emailConfirmed && (new Date().getFullYear() - new Date(user.birthDay).getFullYear()) >= 18 && user.status === StatusUser.Unverify && user.popularity >= 1000?
                                                <Alert severity="info" sx={{borderRadius: 0}}>You can apply for profile verification</Alert> : null
                                        }
                                        <Box sx={{display: "flex", flexDirection: "column", gap: "0.1rem"}}>
                                            <Button variant="text" color="inherit" onClick={() => {fixnav("profile/settings"); toggleMenu(false);}}
                                            sx={{px: 3, textAlign: "start", display: "flex", justifyContent: "start"}} 
                                            startIcon={<SettingsIcon />}><h4>Settings</h4></Button>
                                        </Box>                                    
                                        <Button variant="text" color="error" onClick={() => {toggleMenu(false); logout();}}><h4>Logout</h4></Button>
                                </Stack>  
                            </Menu>
                        </Box>

                    }
                </Box>
                
            </Container>
            <Divider sx={{margin: 0, padding: 0}} />
            <br />
        </div>
    )
}

export default Header;