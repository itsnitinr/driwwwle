import axios from 'axios';

import Stats from '../components/announcements-page/Stats';
import UpcomingFeatures from '../components/announcements-page/UpcomingFeatures';
import CTA from '../components/announcements-page/CTA';

import baseURL from '../utils/baseURL';

const AnnouncementsPage = ({ users, posts }) => {
  return (
    <>
      <Stats users={users} posts={posts} />
      <UpcomingFeatures />
      <CTA />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${baseURL}/api/stats`);
  return {
    props: {
      title: 'Announcements from Driwwwle',
      users: data.users,
      posts: data.posts,
    },
  };
}

export default AnnouncementsPage;
