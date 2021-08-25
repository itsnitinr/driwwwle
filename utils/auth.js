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
    toast.info(res.data.msg);
    Router.push('/');
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
  { bio, techStack, social, profilePicUrl },
  setLoading,
  toast
) => {
  setLoading(true);
  try {
    const res = await axios.post(
      `${baseURL}/api/onboarding/${verificationToken}`,
      {
        bio,
        techStack: techStack.split(',').map((item) => item.trim()),
        social,
        profilePicUrl,
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
  cookie.set('token', token);
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
