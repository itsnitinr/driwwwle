import axios from 'axios';
import Link from 'next/link';
import cookie from 'js-cookie';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from 'react-query';
import { dehydrate } from 'react-query/hydration';
import {
  ClockIcon,
  TagIcon,
  GlobeAltIcon,
  CodeIcon,
  HeartIcon,
  ChatIcon,
} from '@heroicons/react/outline';

import baseURL from '../../utils/baseURL';
import PostHeader from '../../components/post-page/PostHeader';
import PostCarousel from '../../components/post-page/PostCarousel';
import PostDetailsItem from '../../components/post-page/PostDetailsItem';
import PostDetailsLink from '../../components/post-page/PostDetailsLink';
import NewComment from '../../components/post-page/NewComment';
import Comment from '../../components/post-page/Comment';
import NotFound from '../../components/404';
import PostHead from '../../components/PostHead';

const getPost = async (id) => {
  const { data } = await axios.get(`${baseURL}/api/posts/${id}`);
  return data;
};

const PostPage = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;

  const queryClient = useQueryClient();

  const { data } = useQuery(['posts', id], () => getPost(id));

  const { data: comments } = useQuery(['comments', id], async () => {
    const { data } = await axios.get(`${baseURL}/api/comments/${id}`);
    return data;
  });

  const mutation = useMutation(async () => {
    await axios.delete(`${baseURL}/api/posts/${id}`, {
      headers: {
        Authorization: cookie.get('token'),
      },
    });
  });

  const likeMutation = useMutation(
    async () => {
      const { data } = await axios.put(
        `${baseURL}/api/posts/like/${id}`,
        {},
        {
          headers: {
            Authorization: cookie.get('token'),
          },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const old = queryClient.getQueryData(['posts', id]);
        queryClient.setQueryData(['posts', id], { ...old, likes: data.likes });
      },
    }
  );

  const saveMutation = useMutation(
    async () => {
      const { data } = await axios.put(
        `${baseURL}/api/posts/save/${id}`,
        {},
        {
          headers: {
            Authorization: cookie.get('token'),
          },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const old = queryClient.getQueryData(['posts', id]);
        queryClient.setQueryData(['posts', id], { ...old, saves: data.saves });
      },
    }
  );

  const deletePost = async () => {
    try {
      await mutation.mutateAsync();
      toast.success('Post has been deleted successfully');
      router.push('/home');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Something went wrong');
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = data && `${data.title} on Driwwwle`;
  }, [data]);

  if (!data) {
    return <NotFound />;
  }

  return (
    <>
      <PostHead post={data} />
      <div className="max-w-5xl px-4 py-8 md:px-12 md:py-12 mx-auto">
        <PostHeader
          post={data}
          user={user}
          deletePost={deletePost}
          likePost={() => likeMutation.mutate()}
          savePost={() => saveMutation.mutate()}
        />
        <div className="my-8">
          <PostCarousel images={data.images} title={data.title} />
        </div>
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div
              className="w-full text-lg mb-6 md:mb-0 pr-4"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
            <div className="mt-6">
              <h1 className="mb-4 text-lg text-pink-600 font-semibold">
                Comments ({comments.length})
              </h1>
              {user && <NewComment queryClient={queryClient} id={data._id} />}
              {comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  postId={data._id}
                  user={user}
                  queryClient={queryClient}
                />
              ))}
            </div>
          </div>
          <div className="w-100 md:w-1/3 lg:w-1/4 w-full">
            <h3 className="text-lg font-semibold text-pink-600">
              Post Details
            </h3>
            <div className="grid grid-col-1 mt-4 space-y-2">
              <PostDetailsItem
                Icon={ClockIcon}
                detail={format(
                  new Date(data.createdAt),
                  'do MMM yyyy, hh:mm a'
                )}
              />
              <div className="flex flex-wrap items-center border-b py-1">
                <div className="w-5 mr-2">
                  <TagIcon className="h-5 w-5 text-pink-600" />
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {data.techStack.map((tag, index) => (
                    <Link key={index} href={`/posts/tag/${tag}`}>
                      <a className="bg-gray-100 hover:bg-pink-600 hover:text-white transition text-gray-800 text-sm font-semibold rounded-md px-2 py-1">
                        {tag}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <PostDetailsLink Icon={GlobeAltIcon} detail={data.liveDemo} />
              {data.sourceCode && (
                <PostDetailsLink Icon={CodeIcon} detail={data.sourceCode} />
              )}
              <PostDetailsItem
                Icon={HeartIcon}
                detail={`${data.likes.length} likes`}
                isLikes
                open={modalOpen}
                setOpen={setModalOpen}
                postId={data._id}
              />
              <PostDetailsItem
                Icon={ChatIcon}
                detail={`${comments.length} comments`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['posts', id], () => getPost(id));
  await queryClient.prefetchQuery(['comments', id], async () => {
    const { data } = await axios.get(`${baseURL}/api/comments/${id}`);
    return data;
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default PostPage;
