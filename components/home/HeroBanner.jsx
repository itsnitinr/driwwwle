const HeroBanner = () => {
  return (
    <div className="bg-pink-100 py-10 px-6 md:px-16 md:py-10">
      <div className="container mx-auto flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="flex-3 order-2 sm:order-1 text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold w-50 mb-4 md:mb-8">
            Discover creatives websites and developers
          </h1>
          <p className="text-md font-medium text-gray-900 mb-6">
            Driwwwle is the leading destination to find & showcase creative
            websites crafted by talented developers across the globe.
          </p>
          <p className="text-gray-500">
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
