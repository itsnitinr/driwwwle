import axios from 'axios';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { parseCookies, destroyCookie } from 'nookies';

import Head from '../components/Head';
import Layout from '../components/Layout';

import 'tailwindcss/tailwind.css';
import '../public/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

import baseURL from '../utils/baseURL';
import { redirectUser } from '../utils/auth';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout {...pageProps}>
          <ToastContainer />
          <Head title={pageProps.title} />
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes =
    ctx.pathname === '/feed' ||
    ctx.pathname === '/notifications' ||
    ctx.pathname === '/posts/new' ||
    ctx.pathname === '/messages' ||
    ctx.pathname === '/settings';

  const availableForEveryone =
    ctx.pathname === '/home' ||
    ctx.pathname === '/posts/[id]' ||
    ctx.pathname === '/posts/tag/[tag]' ||
    ctx.pathname === '/[username]' ||
    ctx.pathname === '/legal/terms' ||
    ctx.pathname === '/legal/privacy' ||
    ctx.pathname === '/search';

  // If user is not logged in
  if (!token) {
    destroyCookie(ctx, 'token');
    // Redirect to login if user is trying to access protected routes
    protectedRoutes && redirectUser(ctx, '/login');
  } else {
    try {
      const res = await axios.get(`${baseURL}/api/auth`, {
        headers: { Authorization: token },
      });
      const { user } = res.data;
      if (user && !availableForEveryone) {
        !protectedRoutes && redirectUser(ctx, '/home');
      }
      pageProps.user = user;
    } catch (err) {
      destroyCookie(ctx, 'token');
      redirectUser(ctx, '/login');
    }
  }

  return { pageProps };
};

export default MyApp;
