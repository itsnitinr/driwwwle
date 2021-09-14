const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-pink-400 py-10 px-4 md:px-0 md:py-10">
      <div className="container mx-auto flex justify-between items-center flex-wrap sm:flex-nowrap md:px-12">
        <div className="flex-3 order-2 sm:order-1 text-center md:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold text-white w-50 mb-4 md:mb-6">
            Discover creatives websites and developers
          </h1>
          <p className="text-md lg:text-lg font-medium text-white mb-6">
            Driwwwle is the leading destination to find & showcase creative
            websites crafted by talented developers across the globe.
          </p>
          <p className="text-gray-200">
            Illustration by{' '}
            <a
              className="underline"
              href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6"
            >
              Icons 8
            </a>{' '}
            from{' '}
            <a className="underline" href="https://icons8.com/illustrations">
              Ouch!
            </a>
          </p>
        </div>
        <img
          className="h-3/4 mb-10 sm:mb-0 md:h-64 lg:h-96 w-auto flex-2 order-1 sm:order-2"
          src="/illustrations/3d-illustration-home.png"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
