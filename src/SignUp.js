import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import './App.css';
import styled from 'styled-components';

import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth, db } from './shared/firebase';
import {collection, addDoc, getDocs, where, query} from "firebase/firestore";




const theme = createTheme();

const isEmail = (email) => {
  const emailCheck = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return emailCheck.test(email);
};

export default function SignUp() {
  const signupFB = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('NickName')
    });
    if (!isEmail(data.get('email'))) {
      window.alert("이메일 형식을 확인해주세요!");
    }else if(data.get('password')!= data.get('password2')){
      window.alert("비밀번호가 일치하지 않습니다");
    }
    
    const user = await createUserWithEmailAndPassword(
      auth,
      data.get('email'),
      data.get('password'),
      );
    console.log('user',user)

    const user_data = await addDoc(collection(db,"users"), 
    {user_id: user.user.email, name:data.get('NickName')});
    console.log(user_data.id);


  };
  

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#faebd7'  }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={signupFB} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="NickName"
                required
                fullWidth
                id="NickName"
                label="Nick Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Password 확인"
                type="password"
                id="password2"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button2>
          <button className="custom-btn btn-5" type="submit" onClick={() => {
            window.alert('환영합니다')
          }}
          ><span>Sign Up</span></button>
          </Button2>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  </ThemeProvider>
);
}

    

const Button2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
