import {
  UserCircleIcon,
  IdentificationIcon,
  KeyIcon,
} from '@heroicons/react/outline';

const subNavigation = [
  { name: 'User', icon: UserCircleIcon, id: 'user' },
  { name: 'Profile', icon: IdentificationIcon, id: 'profile' },
  { name: 'Password', icon: KeyIcon, id: 'password' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SettingsSidebar = ({ tab, setTab }) => {
  return (
    <aside className="py-6 lg:col-span-3">
      <nav className="space-y-1">
        {subNavigation.map((item) => (
          <a
            key={item.name}
            className={classNames(
              tab === item.id
                ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
              'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
            )}
            onClick={() => setTab(item.id)}
          >
            <item.icon
              className={classNames(
                tab === item.id
                  ? 'text-teal-500 group-hover:text-teal-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
