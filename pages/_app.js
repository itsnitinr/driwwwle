import { ToastContainer } from 'react-toastify';
import Head from '../components/Head';
import Layout from '../components/Layout';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer />
      <Head title={pageProps.title} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
