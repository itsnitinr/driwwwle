import axios from 'axios';
import Router from 'next/router';
import cookie from 'js-cookie';

import baseURL from './baseURL';
import catchErrors from './catchErrors';

export const registerUser = async (
  { name, username, email, password },
  setError,
  setLoading,
  toast,
  setModalOpen
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/signup`, {
      name,
      username,
      email,
      password,
    });
    toast.info(res.data.msg);
    setModalOpen(true);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};

export const loginUser = async (
  { email, password },
  setError,
  setLoading,
  toast
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/auth`, {
      email,
      password,
    });
    setToken(res.data.token);
    Router.push('/feed');
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};

export const onboardUser = async (
  verificationToken,
  formdata,
  setLoading,
  toast
) => {
  setLoading(true);
  try {
    const res = await axios.post(
      `${baseURL}/api/onboarding/${verificationToken}`,
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    setToken(res.data.token);
    toast.success(res.data.msg);
    Router.push('/home');
  } catch (error) {
    const errorMsg = catchErrors(error);
    toast.error(errorMsg);
  }
  setLoading(false);
};

const setToken = (token) => {
  cookie.set('token', token, { expires: 730 });
};

export const logoutUser = () => {
  cookie.remove('token');
  Router.push('/login');
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};
