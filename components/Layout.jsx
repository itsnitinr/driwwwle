import { useRouter } from 'next/router';
import Navbar from './Navbar';

const Layout = ({ children, user }) => {
  const router = useRouter();

  const showNavbar = () => {
    if (
      router.pathname === '/' ||
      router.pathname === '/signup' ||
      router.pathname === '/login'
    ) {
      return false;
    }
    return true;
  };

  return (
    <div>
      {showNavbar() && <Navbar user={user} currentPath={router.pathname} />}
      {children}
    </div>
  );
};

export default Layout;
