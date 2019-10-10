import React, { useState } from 'react';
import {
 Avatar,
 Button,
 CssBaseline,
 Box,
 TextField,
 Typography,
 Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { styled } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import Footer from '../components/Footer';
import theme from '../static/theme';


const StyledPaper = styled(Box)({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledAvatar = styled(Avatar)({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
});

const StyledButton = styled(Button)({
  margin: theme.spacing(3, 0, 2),
});


const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  const login = (userEmail, userPassword) => {
    const apiEndpoint = process.env.ENDPOINT + process.env.API_AUTH_SIGN_IN;

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.jwt) {
          setErrorMsg('');
          localStorage.jwt = res.jwt;
          Router.push('/');
        } else if (res.error) {
          setErrorMsg('Invalid email or password');
        }
    });
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Typography component="h1" variant="subtitle2" color="error">
            {errorMsg}
          </Typography>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => login(email, password)}
          >
            Sign In
          </StyledButton>
      </StyledPaper>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
};


export default LogIn;
