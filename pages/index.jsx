import Hero from '../components/landing-page/Hero';
import Features from '../components/landing-page/Features';
import CTA from '../components/landing-page/CTA';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <CTA />
    </>
  );
};

export function getStaticProps() {
  return {
    props: { title: 'Driwwwle - Find creative websites and developers' },
  };
}

export default LandingPage;
