import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="A portal for web developers to showcase their creative projects."
      />
      <meta property="og:title" content="Driwwwle" />
      <meta
        property="og:description"
        content="Showcase your projects to the world!"
      />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Driwwwle',
};
