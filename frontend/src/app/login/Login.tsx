import {
  Box,
  Button,
  Collapse,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { StandardHeading } from '../../components/StandardHeading';
import { StandardTextField } from '../../components/StandardTextField';
import { LOCAL_STORAGE_JWT_KEY } from '../../config/security';
import { SET_LOGGED_IN } from '../../redux/login/actions';
import { useSafeDispatch } from '../../redux/root/hooks';
import { SET_USER } from '../../redux/user/actions';
import { LoginResource, requests } from '../../utilities/requests/requests';

export function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const login = useLogin(email, password, setError);
  const classes = useStyles();

  return (
    <Container maxWidth="sm" component="main">
      <Box display="flex" height="100vh" alignItems="center">
        <form onSubmit={login} action="javascript:void 0;">
          <Box
            display="flex"
            width="100%"
            flexDirection="column"
            justifyItems="center"
          >
            <StandardHeading>diabetes.page</StandardHeading>

            <StandardTextField
              type="email"
              label="Email"
              value={email}
              onChange={(event) => void setEmail(event.currentTarget.value)}
              error={error}
              withMargin
            />

            <StandardTextField
              type="password"
              label="Password"
              value={password}
              onChange={(event) => void setPassword(event.currentTarget.value)}
              error={error}
              withMargin
            />

            <Collapse in={error}>
              <Typography className={classes.inputField} color="error">
                {/*Todo: i18n*/}
                The email and password you entered did not match our records.
              </Typography>
            </Collapse>

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

const useLogin = (
  email: string,
  password: string,
  setError: (v: boolean) => void,
): (() => void) => {
  const dispatch = useSafeDispatch();

  function onLogin(response: AxiosResponse<LoginResource>): void {
    localStorage.setItem(LOCAL_STORAGE_JWT_KEY, response.data.token);
    dispatch({
      type: SET_USER,
      user: response.data.user,
    });
    dispatch({
      type: SET_LOGGED_IN,
      loggedIn: true,
    });
  }

  return () =>
    void requests
      .login({ email, password })
      .then(onLogin)
      .catch(() => setError(true)); // Todo: Deal with other types of errors
};

const useStyles = makeStyles((theme) => ({
  inputField: {
    marginBottom: theme.spacing(2),
  },
}));
