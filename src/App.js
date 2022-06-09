import './App.css';
import React, { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import {Routes, Route,useNavigate} from "react-router-dom"
import {auth,db} from "./shared/firebase";
import {collection, addDoc, getDocs, where, query} from "firebase/firestore";

import SignUp from './SignUp';
import SignIn from './SignIn';
import styled from 'styled-components';
import Write from './Write';
import Main from './Main';
import { LoginMain } from './Main';
import Detail from './Detail';

import { onAuthStateChanged,signOut } from 'firebase/auth';



let user_name = ""  
const loginPages = ['로그아웃'];
const logoutPages = ['로그인','회원가입']
const settings = ['Logout'];



function App() {
  const [is_login, setIsLogin] = React.useState(false);
  const loginCheck = async(user) => {
    if(user) {
      setIsLogin(true)
    }else{
      setIsLogin(false);
    }
  }
      
  

  console.log(auth.currentUser);
  const navigate = useNavigate();
  const pageJump = (event) => {
    console.log(event.target.name);
    if (event.target.name === '로그인') {
      navigate("/signin");
    }else if (event.target.name === '회원가입') {
      navigate("/signup");
    }else{
      signOut(auth);
    }
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  },[]);

  React.useEffect(() => {
    async function getUserName() {
      const user_docs = await getDocs(
        query(collection(db,"users"),
        where("user_id" , "==" , auth.currentUser?.email)))
        console.log('user_docs',user_docs)
        user_docs.forEach((u)=>{
            user_name = (u.data().name);
            console.log("user_name",user_name)
            console.log(loginPages);
            loginPages.push(user_name)
        })
    }
    getUserName()
  },[auth.currentUser?.email]);

 
 
  return (
    <div className="App">
      <AppBar position="static">
      <StToolbar maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            Home
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            
            <Menu
              id="menu-appbar"
              
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {is_login? loginPages.map((page) => (
                <MenuItem key={page} >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              )): logoutPages.map((page) => (
                <MenuItem key={page} >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              )) }
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            Home
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {is_login? loginPages.map((page) => (
              <Button onClick={pageJump}
                key={page}
                name={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            )): logoutPages.map((page) => (
              <Button onClick={pageJump}
                key={page}
                name={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            )) }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton  sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              
              
            >
              {settings.map((setting) => (
                <MenuItem key={setting} >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </StToolbar>
      </AppBar>
  
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/write' element={<Write/>} />
        <Route path='/detail/:idx' element={<Detail/>} />
        <Route path='/write/:idx' element={<Write/>} />
      </Routes>
      
    </div>
  );
}

export default App;

const StToolbar = styled(Container)`
  background: black;
  min-width: 100%
`;