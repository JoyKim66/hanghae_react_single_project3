import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider} from '@mui/material/styles';



import styled from 'styled-components';
import "./App.css";
import {signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { auth, db } from './shared/firebase';
import {collection, addDoc, getDocs, where, query} from "firebase/firestore";
import {useNavigate} from "react-router-dom";


const theme = createTheme();


export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  
  const handleEmailChange = (event) => {
    // console.log('handleEmailChange',event)
    setEmail(event.target.value);
  }
  const handlePwChange = (event) => {
    // console.log('handlePwChange',event)
    setPw(event.target.value);
  }

  const loginFB = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const user = await signInWithEmailAndPassword(
      auth,
      data.get('email'),
      data.get('password'),
    )
    console.log(user);

    const user_docs = await getDocs(query(
      collection(db,"users"), 
      where("user_id", "==", user.user.email )
    ));

    user_docs.forEach((u) => {
      console.log('u.data(): ',u.data());
    })
    console.log('currentUser',auth.currentUser);
    
    navigate("/")

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
          <Avatar sx={{ m: 1, bgcolor: '#faebd7' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" 
          onSubmit={loginFB} 
          noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              value={email}
              type = "email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePwChange}
              value = {pw}
              autoComplete="current-password"
            />
            <StyledButton>
            <button className="custom-btn btn-5" 
            type='submit' disabled={!email||!pw}>
              <span>Sign In</span></button>
           </StyledButton>
          </Box>
           {/* <StyledButton2>Primary</StyledButton2> */}

        </Box>
      </Container>
    </ThemeProvider>
  );
}


const StyledButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
// const StyledButton2 = styled(Button)`
//     && {
//         width: 500px;
//         background: #000;
//     }
// `;




