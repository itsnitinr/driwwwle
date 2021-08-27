import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import baseURL from '../../utils/baseURL';
import PostHeader from '../../components/post-page/PostHeader';
import PostCarousel from '../../components/post-page/PostCarousel';

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
      <div className="my-8">
        <PostCarousel images={data.images} title={data.title} />
      </div>
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
