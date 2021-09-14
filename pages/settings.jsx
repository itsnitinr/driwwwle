import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
import { parseCookies } from 'nookies';
import { dehydrate } from 'react-query/hydration';
import { useQuery, QueryClient } from 'react-query';

import SettingsHeader from '../components/settings-page/SettingsHeader';
import SettingsSidebar from '../components/settings-page/SettingsSidebar';
import UserSettings from '../components/settings-page/UserSettings';
import ProfileSettings from '../components/settings-page/ProfileSettings';
import PasswordSettings from '../components/settings-page/PasswordSettings';

import baseURL from '../utils/baseURL';

const getProfile = async (token) => {
  const { data } = await axios.get(`${baseURL}/api/profile`, {
    headers: { Authorization: token },
  });
  return data;
};

const SettingsPage = ({ user }) => {
  const [tab, setTab] = useState('user');

  const { data: profile } = useQuery(['profile'], () =>
    getProfile(cookie.get('token'))
  );

  return (
    <div>
      <SettingsHeader />
      <main className="relative -mt-32">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <SettingsSidebar tab={tab} setTab={setTab} />
              {tab === 'user' && <UserSettings user={user} />}
              {tab === 'profile' && <ProfileSettings profile={profile} />}
              {tab === 'password' && <PasswordSettings />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['profile'], () => getProfile(token));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title: 'Your Settings on Driwwwle',
    },
  };
}

export default SettingsPage;
