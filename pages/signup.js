import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
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
  hide: {
    display: 'none',
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const router = useRouter();
  const UUID = router.query.id;

  const [errorMsg, setErrorMsg] = React.useState('');
  const [isSigningUp, setIsSigningUp] = React.useState(false);

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
    };
    const handleInputChange = (event) => {
      event.persist();
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
      });
    };
    const handleNicknameChange = (event) => {
      event.persist();
      setAttendee({
        ...attendee,
        [event.target.name]: event.target.value,
      });
    };
    return {
      handleSubmit,
      handleInputChange,
      handleNicknameChange,
      inputs,
      attendee,
    };
  };


  const {
    inputs,
    attendee,
    handleInputChange,
    handleNicknameChange,
    handleSubmit,
  } = useSignUpForm(signup);


  const signup = () => {
    // TODO: add warning page if there is already an active session
    const signupData = { user: { ...inputs, attendee: attendee } };
    const apiEndpoint = process.env.ENDPOINT + process.env.API_AUTH_SIGN_UP;
    setIsSigningUp(true);
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
          router.push('/');
        } else if (res.error) {
          setErrorMsg(res.error);
          setIsSigningUp(false);
        } else if (res.errors.detail) {
          setErrorMsg(res.errors.detail);
          setIsSigningUp(false);
        }
      });
  };


  const isNicknameValid = attendee.nickname
    ? String(attendee.nickname).length > 1
    && String(attendee.nickname).length < 16
    && String(attendee.nickname).match(
        /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-)[a-zA-Z0-9])*[a-zA-Z0-9]+$/,
      )
      : true;
  const isEmailValid = inputs.email
    ? String(inputs.email).match(/^[^@\s]+@[^@\s]+$/)
    : true;
  const isPasswordShort = inputs.password
    ? String(inputs.password).length < 8
    : false;
  const doPasswordsMatch = inputs.password_confirmation
    ? String(inputs.password) === String(inputs.password_confirmation)
    : true;

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
                  error={!isNicknameValid}
                />
                {isNicknameValid ? null : (
                  <Typography component="h1" variant="subtitle2" color="error">
                    O nickname tem de ter 2 a 15 carateres do tipo a-z e A-Z.
                  </Typography>
                )}
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
                  error={!isEmailValid}
                  required
                  fullWidth
                />
                {isEmailValid ? null : (
                  <Typography component="h1" variant="subtitle2" color="error">
                    O email não é válido.
                  </Typography>
                )}
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
                  error={isPasswordShort}
                  required
                  fullWidth
                />
                {isPasswordShort ? (
                  <Typography component="h1" variant="subtitle2" color="error">
                    A palavra-passe tem de ter, no mínimo, 8 carateres.
                  </Typography>
                ) : null}
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
                  error={!doPasswordsMatch}
                  variant="outlined"
                  required
                  fullWidth
                />
                {doPasswordsMatch ? null : (
                  <Typography component="h1" variant="subtitle2" color="error">
                    As palavras-passe não coincidem.
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={
                isSigningUp
                || !attendee.nickname
                || !inputs.email
                || !inputs.password
                || !inputs.password_confirmation
                || !isNicknameValid
                || !isEmailValid
                || isPasswordShort
                || !doPasswordsMatch
              }
            >
              Sign Up
            </Button>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <CircularProgress className={isSigningUp ? '' : classes.hide} />
              </Grid>
              <Grid item>
                <Typography component="h1" variant="subtitle2" color="error">
                  {errorMsg}
                </Typography>
              </Grid>
              <Grid item>
                {
                  // TODO: add signin page link
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

SignUp.getInitialProps = ({ query }) => ({ query });
