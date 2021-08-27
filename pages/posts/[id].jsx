import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import baseURL from '../../utils/baseURL';
import PostHeader from '../../components/post-page/PostHeader';

const getPost = async (id) => {
  const { data } = await axios.get(`${baseURL}/api/posts/${id}`);
  return data;
};

const PostPage = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(['posts', id], () => getPost(id));

  return (
    <div className="max-w-5xl px-4 py-8 md:px-8 md:py-12 mx-auto">
      <PostHeader post={data} user={user} />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['posts', id], () => getPost(id));
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default PostPage;
