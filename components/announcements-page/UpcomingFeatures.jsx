import {
  FilterIcon,
  PencilAltIcon,
  BadgeCheckIcon,
} from '@heroicons/react/outline';
import { BiMedal } from 'react-icons/bi';
import { RiDashboardLine, RiUserSearchLine } from 'react-icons/ri';

const features = [
  {
    name: 'Filter Posts by Category',
    description:
      "Only interested in a particular category? You'll be able to filter posts by their category soon.",
    icon: FilterIcon,
  },
  {
    name: 'More Badges For Your Profile',
    description:
      "Contributed to the project or posted something creative? You'll be rewarded with cool badges to show off.",
    icon: BadgeCheckIcon,
  },
  {
    name: 'Weekly & Monthly Leaderboard',
    description:
      'A hall of fame for developers with most number of likes on their posts on weekly, monthly and all time basis.',
    icon: BiMedal,
  },
  {
    name: 'User Statistics Dashboard',
    description:
      'Analyze the reach of your posts with a dashboard for fetching total views, likes and comments on your posts.',
    icon: RiDashboardLine,
  },
  {
    name: 'Follow Recommendations',
    description:
      'New to the platform and not sure whom to follow? Let us help you out by suggesting some awesome developers.',
    icon: RiUserSearchLine,
  },
  {
    name: 'Edit Posts Even After Publishing',
    description:
      "Made a mistake while publishing your post? Don't worry! You can still edit your posts after publishing them.",
    icon: PencilAltIcon,
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="container mx-auto pb-16 px-2 md:px-10 lg:px-12 sm:px-6 lg:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Upcoming Features
          </h2>
          <p className="mt-4 text-lg text-gray-500 px-2">
            Driwwwle is in its intial stages at the moment. You can expect the
            following features to be implemented in the near future.
          </p>
        </div>
        <dl className="mt-12 sm:space-y-0 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <feature.icon
                  className="absolute h-6 w-6 text-pink-600"
                  aria-hidden="true"
                />
                <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
