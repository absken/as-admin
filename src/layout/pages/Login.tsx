import React, { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, Link, TextField, Checkbox, CircularProgress, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useLogin, AuthActions, useThemeType, CoreState } from '@as/ui-react-core';

import { getAppTheme } from '../../styles/theme/themes';
import logoIcon from '../../assets/images/as-logo-icon.png';

interface LocationState {
  nextPathname: string;
}

function Login(props: any) {
  const dispatch = useDispatch();
  const login = useLogin();
  const location = useLocation<LocationState>();
  const themeType = useThemeType();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector((state: CoreState) => state.auth.isLoading);
  const sysError = useSelector((state: CoreState) => state.auth.error);
  const customError = useSelector((state: CoreState) => state.auth.customError);

  // make sure login status is reset
  useEffect(() => {
    dispatch(AuthActions.authLogout(null));
  }, [dispatch]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputs((inputValues) => ({ ...inputValues, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (username && password) {
      login({ username, password }, location.state ? location.state.nextPathname : '/');
    }
  };

  const appTheme = useMemo(() => {
    const theme = getAppTheme(themeType);
    return createTheme(theme);
  }, [themeType]);

  return (
    <ThemeProvider theme={appTheme}>
      <div className="bg-body">
        <nav className="shadow-md bg-primary border-b border-gray-200 fixed z-30 w-full text-white">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <a href="aaa" className="text-xl font-bold flex items-center lg:ml-2.5">
                  <img src={logoIcon} alt="AbsenceSoft Admin" className="h-7 mr-2" />
                  <span className="self-center whitespace-nowrap">
                    AbsenceSoft <span className="text-secondary">Admin</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>
          <div className="mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-20">
            <div className="bg-white shadow-md rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
              <div className="p-6 sm:p-8 lg:p-16 space-y-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Log in to AbsenceSoft Admin
                </h2>
                <form className="mt-8 space-y-6" action="#">
                  <div>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      margin="normal"
                      required
                      fullWidth
                      label="Email Address"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      size="small"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      size="small"
                      className="border-red-50"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Checkbox name="remember" className="mx-0 px-0" />
                    </div>
                    <div className="text-sm ml-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="remember" className="font-medium text-gray-900">
                        Remember me
                      </label>
                    </div>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                      component="button"
                      className="text-sm text-secondary ml-auto"
                      underline="hover"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    variant="contained"
                    className="btn bg-secondary hover:bg-secondary-hover text-white font-bold w-full sm:w-auto"
                    disabled={loggingIn}
                    onClick={handleSubmit}
                  >
                    Login
                    {loggingIn && (
                      <CircularProgress size={18} thickness={3} className="ms-2 text-white" />
                    )}
                  </Button>
                  <div className="text-sm font-medium text-gray-500">
                    Not registered? {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                      component="button"
                      className="text-sm text-secondary font-bold ml-auto"
                      underline="hover"
                    >
                      Create account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default Login;
