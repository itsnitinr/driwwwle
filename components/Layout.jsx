import nProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';

import 'nprogress/nprogress.css';

const Layout = ({ children, user }) => {
  const router = useRouter();

  Router.onRouteChangeStart = () => nProgress.start();
  Router.onRouteChangeComplete = () => nProgress.done();
  Router.onRouteChangeError = () => nProgress.done();

  const showNavbar = () => {
    if (
      router.pathname === '/' ||
      router.pathname === '/signup' ||
      router.pathname === '/login' ||
      router.pathname === '/onboarding/[token]'
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar() && <Navbar user={user} currentPath={router.pathname} />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
