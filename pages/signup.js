import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Link from '../components/NextMUILink';
import Layout from '../components/Layout';

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

SignUp.getInitialProps = ({ query }) => {
  return { query };
};

export default function SignUp() {
  const classes = useStyles();

  const router = useRouter();
  const UUID = router.query.id;
  // console.log(UUID);

  const [errorMsg, setErrorMsg] = React.useState('');

  const useSignUpForm = (callback) => {
    const [attendee, setAttendee] = React.useState({
      id: UUID,
      nickname: '',
    });
    const [inputs, setInputs] = React.useState({
      email: '',
      password: '',
      password_confirmation: '',
      attendee: '',
    });
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    }
    const handleInputChange = (event) => {
      event.persist();
      setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }));
    }
    const handleNicknameChange = (event) => {
      event.persist();
      setAttendee((attendee) => ({ ...attendee, [event.target.name]: event.target.value }));
    }
    return {
      handleSubmit,
      handleInputChange,
      handleNicknameChange,
      inputs,
      attendee,
    };
  };


  const signup = () => {

    // TODO: add warning page if there is already an active session
    const signupData = { user: { ...inputs, attendee: attendee } };
    // console.log(signupData);
    const apiEndpoint = process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_AUTH_SIGN_UP;
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.jwt) {
          setErrorMsg('');
          localStorage.jwt = res.jwt;
          window.location.pathname = '/';
        } else if (res.error) {
          setErrorMsg(res.error);
        } else if (res.errors.detail) {
          setErrorMsg(res.errors.detail);
        }
    });
  };

  const { inputs,
          attendee,
          handleInputChange,
          handleNicknameChange,
          handleSubmit,
        } = useSignUpForm(signup);

  return (
    <Layout>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
      Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
          id="nickname"
          name="nickname"
          label="Nickname"
          autoComplete="nickname"
          onChange={handleNicknameChange}
          value={attendee.nickname}
          variant="outlined"
          required
          fullWidth
          autoFocus
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          id="email"
          name="email"
          label="Email Address"
          autoComplete="email"
          onChange={handleInputChange}
          value={inputs.email}
          variant="outlined"
          required
          fullWidth
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleInputChange}
          value={inputs.password}
          variant="outlined"
          required
          fullWidth
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          id="password_confirmation"
          name="password_confirmation"
          label="Re-enter password"
          type="password"
          autoComplete="current-password"
          onChange={handleInputChange}
          value={inputs.password_confirmation}
          variant="outlined"
          required
          fullWidth
        />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
        <Typography component="h1" variant="subtitle2" color="error">
          {errorMsg}
        </Typography>
        </Grid>
        <Grid item>
        {// TODO: add signin page link}
        }
        <Link href="/" variant="body2">
          Already have an account? Sign in
        </Link>
        </Grid>
      </Grid>
      </form>
    </div>
    </Container>
    </Layout>
  );
}