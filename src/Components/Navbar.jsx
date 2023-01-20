import React,{useState,useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import userData from './Store';

import Logo from "../Media/voteLogo.png"
// import Classes from "./Navbar.module.css"
const pages = ["How Do We Work?",'Contact' ];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function NavbarComponenet(args) {
   const {Auth,setAuth,setMessage} = useContext(userData)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggle=()=>{
    if(Auth.isAuthrized===true){
      setAuth({...Auth,IsLogin:false, Firstname: "",
      PhoneNo: "",
      email: "",
      Gender: '',
      password: "",
      Role: "",
      isAuthrized: false,
      isVoted: "No",
      Age:"",});
      setMessage("")

    }
    else if(Auth.IsLogin==="Log Out" && Auth.isAuthrized==="true"){
      // setButtonShow(("Sign In"));
      // setAuth({...Auth,showLogin:false});
    }
    
  }
  return (
     <AppBar position="static" style={{backgroundImage: "linear-gradient( 117deg,  rgba(123,216,96,1) 39.2%, rgba(255,255,255,1) 156.2% )"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <HowToVoteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} > <img src={Logo} height="50px" /></HowToVoteIcon>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VOTIFY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <HowToVoteIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} > <img src={Logo} height="50px"   /></HowToVoteIcon>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VOTIFY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          <Button onClick={toggle}  >{Auth.isAuthrized?"Log Out":"Sign In"}</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
    
}

export default NavbarComponenet;