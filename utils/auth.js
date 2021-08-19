import axios from 'axios';
import Router from 'next/router';
import cookie from 'js-cookie';

import baseURL from './baseURL';
import catchErrors from './catchErrors';

export const registerUser = async (
  { name, username, email, password },
  setError,
  setLoading,
  toast
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/signup`, {
      name,
      username,
      email,
      password,
    });
    setToken(res.data.token);
    toast.info(res.data.msg);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};

export const loginUser = async ({ email, password }, setError, setLoading) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/auth`, {
      email,
      password,
    });
    setToken(res.data.token);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setLoading(false);
};

const setToken = (token) => {
  cookie.set('token', token);
  Router.push('/');
};
