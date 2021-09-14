import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { AiOutlineLoading } from 'react-icons/ai';
import {
  PencilIcon,
  TerminalIcon,
  LinkIcon,
  CodeIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline';

import PostInput from '../../components/new-post/PostInput';
import RichTextEditor from '../../components/new-post/RichTextEditor';
import ImageDropzone from '../../components/new-post/ImageDropzone';
import ThumbnailsDND from '../../components/new-post/ThumbnailsDND';

import baseURL from '../../utils/baseURL';

const NewPost = ({ user }) => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [liveDemo, setLiveDemo] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [images, setImages] = useState([]);

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/posts`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data',
        },
      })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    if (description.trim() === '') {
      return toast.error('Please add a description');
    }

    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append(
      'techStack',
      JSON.stringify(techStack.split(',').map((item) => item.trim()))
    );
    formdata.append('liveDemo', liveDemo);
    formdata.append('sourceCode', sourceCode);
    for (const key of Object.keys(images)) {
      formdata.append('images', images[key]);
    }

    try {
      await mutation.mutateAsync(formdata);
      toast.success('Your post has been successfully uploaded');
      router.push('/home');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <div className="bg-gray-100 px-6 md:px-12 py-10">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-3xl mb-8 text-gray-700 font-bold mr-auto">
          Ready to post,{' '}
          <span className="text-pink-600">{user.name.split(' ')[0]}</span>?
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-5 mr-auto block w-full">
            <PostInput
              Icon={PencilIcon}
              label="Give your post a title"
              id="title"
              placeholder="My new epic website"
              value={title}
              setValue={setTitle}
              required
            />
          </div>
          <div className="mb-5 mr-auto block w-full">
            <PostInput
              Icon={CodeIcon}
              small="Please use comma separated values"
              label="What tech stack did you use?"
              id="tech-stack"
              placeholder="Next.js, TailwindCSS, MongoDB, Socket.io"
              value={techStack}
              setValue={setTechStack}
              required
            />
          </div>
          <div className="mb-5 mr-auto grid md:grid-cols-2 gap-4 w-full">
            <PostInput
              Icon={LinkIcon}
              label="Deployed website URL"
              id="live-demo"
              placeholder="https://nitinranganath.me"
              value={liveDemo}
              setValue={setLiveDemo}
              required
            />
            <PostInput
              Icon={TerminalIcon}
              label="Source code repository"
              id="source-code"
              placeholder="https://github.com/itsnitinr/driwwwle"
              value={sourceCode}
              setValue={setSourceCode}
            />
          </div>
          <label
            htmlFor="description"
            className="block mr-auto text-md font-medium text-pink-600 mb-2"
          >
            Add some description <span className="text-red-400">*</span>
          </label>
          <RichTextEditor value={description} setValue={setDescription} />
          <ImageDropzone setImages={setImages} />
          {images.length > 0 && (
            <ThumbnailsDND images={images} setImages={setImages} />
          )}
          <button
            type="submit"
            className="mt-8 flex items-center shadow w-full justify-center md:w-max ml-auto bg-pink-600 px-4 py-2 text-white font-semibold rounded-lg disabled:pointer-events-none disabled:opacity-50"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <AiOutlineLoading className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <PlusCircleIcon className="h-5 w-5 mr-2" />
            )}
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export function getServerSideProps() {
  return { props: { title: 'Create a New Post' } };
}

export default NewPost;
