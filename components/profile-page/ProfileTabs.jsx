import {
  UserIcon,
  ViewGridIcon,
  BookmarkIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const tabs = [
  { name: 'Posts', icon: ViewGridIcon },
  { name: 'About', icon: UserIcon },
];

const authTabs = [
  { name: 'Saved', icon: BookmarkIcon },
  { name: 'Statistics', icon: PresentationChartLineIcon },
];

const ProfileTabs = ({ currentTab, setCurrentTab, user, profile }) => {
  return (
    <div className="block mb-8">
      <div className="border-b border-gray-200">
        <nav
          className="-mb-px flex space-x-8 overflow-x-auto"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <a
              key={tab.name}
              onClick={() => setCurrentTab(tab.name)}
              className={classNames(
                currentTab === tab.name
                  ? 'border-pink-600 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'group inline-flex cursor-pointer items-center py-4 px-1 border-b-2 font-medium text-sm'
              )}
              aria-current={currentTab === tab.name ? 'page' : undefined}
            >
              <tab.icon
                className={classNames(
                  currentTab === tab.name
                    ? 'text-pink-600'
                    : 'text-gray-400 group-hover:text-gray-500',
                  '-ml-0.5 mr-2 h-5 w-5'
                )}
                aria-hidden="true"
              />
              <span>{tab.name}</span>
            </a>
          ))}
          {user &&
            profile === user &&
            authTabs.map((tab) => (
              <a
                key={tab.name}
                onClick={() => setCurrentTab(tab.name)}
                className={classNames(
                  currentTab === tab.name
                    ? 'border-pink-600 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'group inline-flex cursor-pointer items-center py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={currentTab === tab.name ? 'page' : undefined}
              >
                <tab.icon
                  className={classNames(
                    currentTab === tab.name
                      ? 'text-pink-600'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </a>
            ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileTabs;
