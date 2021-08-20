import HeroBanner from '../components/home/HeroBanner';

const HomePage = ({ user }) => {
  return (
    <>
      <HeroBanner />
      <main className="container mx-auto p-8 md:px-16 md:py-10">
        <h1 className="text-2xl text-pink-600 font-bold">Recent Posts</h1>
      </main>
    </>
  );
};

export default HomePage;
