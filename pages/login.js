import React,  {useState} from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container }  from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const LogIn = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  const login = (email, password) => {
    const api_endpoint = "https://safira20.herokuapp.com/api/auth/sign_in/";
    
    axios.post(api_endpoint, {
      email: email,
      password: password
    })
    .then(res => handleLoginResponse(res))
    .catch(res => handleErrorResponse(res));
  } 
  
  const handleLoginResponse = (res) => {
    if (res.data.hasOwnProperty("jwt")) {
      setErrorMsg('');
      localStorage.jwt = res.data.jwt;
      window.location.pathname = "/";
    } else {
      setErrorMsg('Login error');
    }
  }
  
  const handleErrorResponse = (res) => {
    if (res.response) {
      setErrorMsg('Invalid email or password');
    } else {
      setErrorMsg('Login error');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
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
            onChange={()=>setEmail(event.target.value)}
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
            onChange={()=>setPassword(event.target.value)}
          />
          <Typography component="h1" variant="subtitle2" color="error">
            {errorMsg}
          </Typography>  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => login(email, password)}
          >
            Sign In
          </Button>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}


export default LogIn;