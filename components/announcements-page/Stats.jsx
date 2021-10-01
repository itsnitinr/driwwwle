import CountUp from 'react-countup';
import { formatDistanceStrict } from 'date-fns';

const Stats = ({ users, posts }) => {
  const daysSinceLaunch = formatDistanceStrict(
    Date.now(),
    new Date('30 Sep 2021'),
    {
      unit: 'day',
    }
  ).split(' ')[0];

  return (
    <div className="bg-pink-600 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            An Amazing Lift Off 🚀
          </h2>
          <p className="text-lg text-gray-100 mt-2">
            A huge thanks to everyone who joined the platform and got us off to
            a great start ♥
          </p>
          <a
            href="https://www.producthunt.com/posts/driwwwle?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-driwwwle"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=314294&theme=light"
              alt="Driwwwle - Just like Dribbble, but for developers | Product Hunt"
              width="250"
              height="54"
              className="mx-auto my-6"
            />
          </a>
        </div>
      </div>
      <div className="mt-10 pb-12 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-pink-600" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Developers Onboarded
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-pink-600">
                    <CountUp end={users} duration={3} />
                  </dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dd className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Awesome Posts
                  </dd>
                  <dd className="order-1 text-5xl font-extrabold text-pink-600">
                    <CountUp end={posts} duration={3} />
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Days Since Launch
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-pink-600">
                    <CountUp end={daysSinceLaunch} duration={1} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
