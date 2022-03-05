import { Alert, AlertTitle, Avatar, Backdrop, Badge, Box, Button, CircularProgress, Container, Dialog,
    Divider, Grid, IconButton, ImageList, ImageListItem, LinearProgress, 
    Skeleton, 
    Snackbar, Stack, styled, Tooltip, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { GetImageUser, StatusUser } from "../../../httpvariable";
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { PhotoCamera } from "@mui/icons-material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import moment from "moment";
import { IAddImageServer, IRemoveImageServer, IUpdateAvatarServer } from "../../../store/reducers/identityReducer/types";
import { useActions } from "../../../hooks/useActions";
import ImageIcon from '@mui/icons-material/Image';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Input = styled('input')({
    display: 'none',
});

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

const Profile : React.FC = () => {

    const user = useTypedSelector(state => state.identity.profile);
    const navigate = useNavigate();

    const {updateAvatarUser, getImagesUser, removeImageUser, addImageUser} = useActions();

    const [open, setOpen] = useState(false);
    const [inform, setInform] = useState(false);
    const [avatarState, setAvatarState] = useState(user !== null ? GetImageUser + user.avatar : "");
    const [avatarFile, setAvatarFile] = useState(null);
    const [openImage, setOpenImage] = useState(false);
    const [imageState, setImageState] = useState("https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png");
    const [imageFile, setImageFile] = useState(null);
    const [imageDialog, setImgDialog] = useState(false);
    const [isNickname, setIsntNicks] = useState(true);
    
    const error = useTypedSelector(state => state.identity.error);
    const loader = useTypedSelector(state => state.identity.loading);
    const images = useTypedSelector(state => state.identity.images);
    const message = useTypedSelector(state => state.identity.message);

    const [snack, setSnack] = useState(false);

    

    const fixnav = (path: string) => {
        window.scrollTo(0,0);
        navigate(path);
    }
    const onChangeAvatar = (event: any) => {
        setAvatarFile(event.target.files[0]);
        setAvatarState(URL.createObjectURL(event.target.files[0]))
    }
    const onChangeImage = (event: any) => {
        setImageFile(event.target.files[0]);
        setImageState(URL.createObjectURL(event.target.files[0]))
    }

    useEffect(() => {
        async function work() {
            try {
                if (user !== null) {                  
                    await getImagesUser(user.email)
                }
            } catch (error) {
                console.log(error);
            }
        }
        work();

        return function cleanup () {}
    }, [user]);

    useEffect(() => {
        if (message.length > 0) {
            setSnack(true);
        }
        return function cleanup () {}
    }, [message]);

    useEffect(() => {
        if (error.length > 0) {
            setSnack(true);
        }

        return function cleanup () {}
    }, [error]);

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

    const SaveImage = async () => {
        if (avatarFile === null) {
            return;
        }
        if (user !== null) {           
            var request : IUpdateAvatarServer = {
                findEmail: user.email,
                avatar: avatarFile,
            }
            try {
                await updateAvatarUser(request);
                setSnack(true);
                setOpen(false);
            } catch (error) {
                setSnack(true);
            }

            return;
        }
    }

    const RemoveImage = async (image: string) => {
        if (user !== null) {           
            var request : IRemoveImageServer = {
                email: user.email,
                image: image,
            }
            try {
                await removeImageUser(request);
                setSnack(true);
                setOpen(false);
            } catch (error) {
                setSnack(true);
            }

            return;
        }
    }

    const AddImage = async () => {
        if (user !== null && imageFile !== null) {           
            const request : IAddImageServer = {
                email: user.email,
                file: imageFile,
            }
            try {
                await addImageUser(request);
                setSnack(true);
                setOpenImage(false);
            } catch (error) {
                setSnack(true);
            }

            return;
        }
    }

    const InformHaven = () => {
        return fillingProfile() < 100 || !user?.emailConfirmed || 
        (fillingProfile() >= 100 && user?.emailConfirmed && (new Date().getFullYear() - new Date(user?.birthDay).getFullYear()) >= 18 && user?.status === StatusUser.Unverify &&  user?.popularity >= 1000)
    }

    return (
        <Container maxWidth="md">
            {
                user !== null ? 
                <Box>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loader}
                        >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    {
                        error !== null && error !== undefined && error.length > 0 ? 
                            <Snackbar open={snack} autoHideDuration={6000} onClose={() => {setSnack(false)}}>
                                <Alert onClose={() => {setSnack(false)}} severity="error" sx={{ width: '100%' }}>
                                    <AlertTitle>Upload new avatar</AlertTitle>
                                    {error}
                                </Alert>
                            </Snackbar>
                            : 
                            <Snackbar open={snack} autoHideDuration={6000} onClose={() => {setSnack(false)}}>
                                <Alert onClose={() => {setSnack(false)}} severity="success" sx={{ width: '100%' }}>
                                    <AlertTitle>Upload new avatar</AlertTitle>
                                    Avatar success uploaded
                                </Alert>
                            </Snackbar>
                    }
                    {
                        message !== null && message !== undefined && message.length > 0 ?
                        <Snackbar open={snack} autoHideDuration={6000} onClose={() => {setSnack(false)}}>
                            <Alert onClose={() => {setSnack(false)}} severity="success" sx={{ width: '100%' }}>
                                <AlertTitle>{message.split('.')[0]}</AlertTitle>
                                {message.split('.')[1]}
                            </Alert>
                        </Snackbar> : null
                    }
                    <Dialog
                        open={open}
                        onClose={() => {setOpen(false); setAvatarState(GetImageUser + user?.avatar)}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", p:2}}>
                            <h3>Change avatar</h3>
                            <IconButton color="inherit" component="span" onClick={() => {setOpen(false); setAvatarState(GetImageUser + user?.avatar)}}>
                                <CloseOutlinedIcon sx={{fontSize: "1.5rem"}} />
                            </IconButton>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", p:4}}>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", p:3}}>
                                <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                                    <img src={avatarState} alt="avatar" width={300} height={300} style={{objectFit: "cover"}} />
                                </Box>
                                <label htmlFor="icon-button-file" style={{textAlign: "center"}}>
                                    <Input accessKey="image/*" id="icon-button-file" type="file" onChange={onChangeAvatar} />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera sx={{fontSize: "3rem"}} />
                                    </IconButton>
                                    <h3>Choose image</h3>                      
                                </label>
                            </Box>
                            <Divider />
                            <Box sx={{display: "flex", justifyContent: "end", alignItems: "center", gap: "1rem"}}> 
                                <Button variant="text" color="primary" disabled={avatarFile === null ? true : false} onClick={async () => {await SaveImage()}}><h3>Save</h3></Button>
                            </Box>
                        </Box>
                    </Dialog>

                    <Dialog
                        open={openImage}
                        onClose={() => {setOpen(false); setAvatarState("https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png")}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", p:2}}>
                            <h3>Add new image</h3>
                            <IconButton color="inherit" component="span" onClick={() => {setOpenImage(false); setAvatarState("https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png")}}>
                                <CloseOutlinedIcon sx={{fontSize: "1.5rem"}} />
                            </IconButton>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", p:4}}>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", p:3}}>
                                <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                                    <img src={imageState} alt="avatar" width={300} height={300} style={{objectFit: "cover"}} />
                                </Box>
                                <label htmlFor="icon-button-file" style={{textAlign: "center"}}>
                                    <Input accessKey="image/*" id="icon-button-file" type="file" onChange={onChangeImage} />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera sx={{fontSize: "3rem"}} />
                                    </IconButton>
                                    <h3>Choose image</h3>                      
                                </label>
                            </Box>
                            <Divider />
                            <Box sx={{display: "flex", justifyContent: "end", alignItems: "center", gap: "1rem"}}> 
                                <Button variant="text" color="primary" disabled={imageFile === null ? true : false} onClick={async () => {await AddImage()}}><h3>Add</h3></Button>
                            </Box>
                        </Box>
                    </Dialog>

                    <Dialog
                        open={imageDialog}
                        onClose={() => {setImgDialog(false)}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", p:2}}>
                            <h3>Images</h3>
                            <IconButton color="inherit" component="span" onClick={() => {setImgDialog(false);}}>
                                <CloseOutlinedIcon sx={{fontSize: "1.5rem"}} />
                            </IconButton>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", p:2}}>
                            <Button onClick={() => {setOpenImage(true)}}><h3>Add new image</h3></Button>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", p:2, overflowY: "auto"}}>
                            {
                                images === null ? null :
                                images.reverse().map(image => {
                                    return (
                                        <Box key={image} sx={{display: "flex", flexDirection: "column", p:2}}>
                                            <img src={`${GetImageUser}${image}`} alt="image" width={450} height={450} style={{objectFit: "cover"}} loading="lazy" />
                                            <Box sx={{display: "flex", justifyContent: "end", background: "whitesmoke"}}>
                                                <Button color="error" onClick={async () => {await RemoveImage(image)}}><DeleteOutlineIcon/></Button>
                                            </Box>
                                        </Box>
                                        
                                    )
                                })
                            }
                        </Box>
                    </Dialog>

                    <Box>
                        <Stack
                            direction="column"
                            divider={
                                <Divider orientation="horizontal"/>                
                            }
                            spacing={4}>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
                                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Box  sx={{display: "flex", flexDirection: "column", alignItems: "center", position: "relative", gap: "1rem"}}>
                                        <Avatar alt="Remy Sharp" sx={{ width: 300, height: 300, borderRadius: "50%"}} 
                                        src={`${GetImageUser}${user.avatar}`}/>
                                        <Box sx={{width: 300, height: 300, backgroundColor:"black", position: "absolute", 
                                        display: "flex", alignItems: "center", opacity: 0, justifyContent: "center",
                                        borderRadius: "50%", '&:hover': {
                                            cursor: 'pointer',
                                            opacity: "80%"}}}>
                                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                                    <Button sx={{borderRadius: "50%"}} onClick={() => {setOpen(true)}}>
                                                        <PhotoCameraOutlinedIcon sx={{fontSize: "5rem"}} />
                                                    </Button>
                                                    <h3 style={{color: "white"}}>Change a photo</h3>
                                                </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}} onClick={() => {setIsntNicks(!isNickname);}}>
                                    <h1 style={{display: "flex", alignItems: "center", gap: "0.3rem", cursor: "pointer"}}>
                                        {
                                            isNickname ? <div>{user.nickname}</div> : <div>{user.name} {user.surname}</div>
                                        }
                                            {
                                                user.status === StatusUser.Verify ?
                                                <Tooltip TransitionComponent={Zoom} title="This account is verified" arrow placement="top">
                                                    <VerifiedIcon color="primary" sx={{fontSize: "1.5rem"}} />
                                                </Tooltip> : null
                                            }
                                    </h1>
                                </Box>
                            </Box>
                            <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                                <Stack direction="row"
                                        divider={
                                            <Divider orientation="vertical"/>                
                                        }
                                        spacing={3}
                                        sx={{display: "flex", justifyContent: "space-between"}}>             
                                    <Button sx={{display: "flex", flexDirection: "column", alignItems: "center", gap:".5rem", p:2}} onClick={() => {fixnav("messenger")}} color="inherit">
                                        <ChatBubbleOutlinedIcon color="inherit" />                            
                                        <h3>Messenger</h3>
                                    </Button>
                                    <Button sx={{display: "flex", flexDirection: "column", alignItems: "center", gap:".5rem", p:2}} color="primary">
                                        <h3 style={{margin: 0, display: "flex", gap: "0.3rem"}}><StarOutlinedIcon color="primary" /> {user?.popularity}</h3>                    
                                        <h3>Reputation</h3>
                                    </Button>
                                    <Button sx={{display: "flex", flexDirection: "column", alignItems: "center", gap:".5rem", p:2}} onClick={() => {setImgDialog(true)}} color="inherit">
                                        <ImageIcon color="inherit" />                            
                                        <h3>Images</h3>
                                    </Button>
                                    {
                                        InformHaven() ?
                                        <Button sx={{display: "flex", flexDirection: "column", alignItems: "center", gap:".5rem", p:2}} color="error" variant={`${inform ? "contained" : "text"}`} 
                                        onClick={() => {setInform(!inform)}}>
                                            <h3 style={{margin: 0, display: "flex", gap: "0.3rem"}}><InfoOutlinedIcon color={`${inform ? "inherit" : "error"}`} /></h3>                    
                                            <h3>Information</h3>
                                        </Button> : null
                                    }
                                </Stack>                       
                                {
                                    InformHaven() ?
                                    <Box sx={{display: inform ? "flex" : "none", flexDirection: "column", gap: "1rem", mb: 3}}>
                                        <h2>Not necessarily but worth it</h2>
                                        {
                                                fillingProfile() < 100 ?
                                                <Alert severity="info">
                                                    <AlertTitle><h3>Filling profile</h3></AlertTitle>
                                                    <h3>Please, fill your account!</h3>
                                                </Alert> : null
                                            }
                                            {
                                                !user.emailConfirmed ?
                                                <Alert severity="error">
                                                    <AlertTitle><h3>Email</h3></AlertTitle>
                                                    <h3>Please, сonfirm your email!</h3>
                                                </Alert> : null
                                            }
                                            {
                                                fillingProfile() >= 100 && user.emailConfirmed && (new Date().getFullYear() - new Date(user.birthDay).getFullYear()) >= 18 && user.status === StatusUser.Unverify && user.popularity >= 1000 ?
                                                <Alert severity="info">
                                                    <AlertTitle><h3>Verify</h3></AlertTitle>
                                                    <h3>You can apply for profile verification (SETTINGS)</h3>
                                                </Alert> : null
                                            }
                                    </Box> :
                                    <Alert severity="success" sx={{display: inform ? "flex" : "none", mb: 3}}>
                                        <AlertTitle><h3>Information</h3></AlertTitle>
                                        <h3>You doesnt have complaints, required actions</h3>
                                    </Alert>
                                }
                                <Box sx={{mb:3}}>
                                    <Box>
                                        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                                            <h2>Filling profile</h2>
                                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                                <LinearProgress variant="determinate" value={fillingProfile()} />
                                                <h4 style={{textAlign: "center", marginTop: "0.5rem", marginBottom: 0}}>{fillingProfile()}%</h4>
                                            </Box>
                                        </Box>
                                    </Box>                        
                                </Box>
                            </Box>  
                            <Box>
                                <Stack direction="column" spacing={4} divider={<Divider orientation="horizontal"/>}>
                                    <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                                        <Grid container spacing={2} sx={{display: "flex", alignItems: "center"}}>
                                            <Grid item xs={3}>
                                                <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                    <h2>Email</h2>
                                                    <h3>{user.email}</h3>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                    <h2>Phone</h2>
                                                    <h3>{user.phone}</h3>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                    <h2>Birth Day</h2>
                                                    <h3>{moment(user.birthDay).format('MM.DD.YYYY')}</h3>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                    <h2>Gender</h2>
                                                    <h3>{user.gender}</h3>
                                                </Box>
                                            </Grid>
                                            {
                                                user.quote.length > 0 ?
                                                <Grid item xs={8}>
                                                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                        <h2>Quote</h2>
                                                        <h3>{user.quote}</h3>
                                                    </Box>
                                                </Grid> : null
                                            }
                                            {
                                                user.language.length > 0 ?         
                                                <Grid item xs={4}>
                                                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                        <h2>Language</h2>
                                                        <h3>{user.language}</h3>
                                                    </Box>
                                                </Grid> : null            
                                            }
                                            {
                                                user.jobGeolocation.length > 0 ?         
                                                <Grid item xs={4.5}>
                                                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                        <h2>Job Location</h2>
                                                        <h3>{user.jobGeolocation}</h3>
                                                    </Box>
                                                </Grid> : null            
                                            }
                                            {
                                                user.studyGeolocation.length > 0 ?         
                                                <Grid item xs={4.5}>
                                                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                        <h2>Study Location</h2>
                                                        <h3>{user.studyGeolocation}</h3>
                                                    </Box>
                                                </Grid> : null            
                                            }                                                                      
                                            <Grid item xs={3}>
                                                <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                    <h2>Country</h2>
                                                    <h3>{user.country}</h3>
                                                </Box>
                                            </Grid>
                                            {
                                                user.studyName.length > 0 ?  
                                                <Grid item xs={3.5}>
                                                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                        <h2>Study</h2>
                                                        <h3>{user.studyName}</h3>
                                                    </Box>
                                                </Grid>
                                                : null
                                            }
                                            {
                                                user.skills.length > 0 ?  
                                                <Grid item xs={5}>
                                                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                        <h2>Skills</h2>
                                                        <h3>{user.skills}</h3>
                                                    </Box>
                                                </Grid>
                                                : null
                                            }
                                            {
                                                user.jobName.length > 0 ?  
                                                <Grid item xs={3.5}>
                                                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                        <h2>Job</h2>
                                                        <h3>{user.jobName}</h3>
                                                    </Box>
                                                </Grid>
                                                : null
                                            }                                                                                                                            
                                            {
                                                user.socialSlot1.length > 0 ? 
                                                <Grid item xs={12}>
                                                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                        <h2>Link</h2>
                                                        <h3>{user.socialSlot1}</h3>
                                                    </Box>
                                                </Grid>
                                                : null
                                            }
                                            {
                                                user.socialSlot2.length > 0 ?
                                                <Grid item xs={12}>
                                                    <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                        <h2>Link</h2>
                                                        <h3>{user.socialSlot2}</h3>
                                                    </Box>
                                                </Grid>
                                                : null
                                            }
                                            {
                                                user.socialSlot3.length > 0 ?
                                                    <Grid item xs={12}>
                                                        <Box sx={{background: "whitesmoke", p:3, display: "flex", flexDirection: "column", gap: "1rem"}}>
                                                            <h2>Link</h2>
                                                            <h3>{user.socialSlot3}</h3>
                                                        </Box>
                                                    </Grid>
                                                : null
                                            }
                                            
                                            
                                            
                                        </Grid>
                                    </Box>                                              
                                </Stack>
                            </Box>                        
                        </Stack>  
                    </Box>
                </Box>
                :
                <Box>
                    <Stack
                        direction="column"
                        divider={
                            <Divider orientation="horizontal"/>                
                        }
                        spacing={4}>
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
                            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Skeleton variant="circular" width={300} height={300} animation="wave" />
                            </Box>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                            <Skeleton variant="rectangular" width={"100%"} height={100} animation="wave" />                                                    
                        </Box>                                          
                    </Stack>  
                </Box>
            }
        </Container>
    )
}

export default Profile;