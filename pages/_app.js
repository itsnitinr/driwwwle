import Head from '../components/Head';
import Layout from '../components/Layout';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head title={pageProps.title} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
