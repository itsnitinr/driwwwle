import { useState } from 'react';
import {
  PencilIcon,
  TerminalIcon,
  LinkIcon,
  CodeIcon,
} from '@heroicons/react/outline';

import PostInput from '../../components/new-post/PostInput';
import ImageDropzone from '../../components/new-post/ImageDropzone';
import ThumbnailsDND from '../../components/new-post/ThumbnailsDND';

const NewPost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [techStack, setTechStack] = useState('');
  const [liveDemo, setLiveDemo] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [images, setImages] = useState([]);

  return (
    <div className="bg-pink-50 px-6 md:px-20 xl:px-32 py-10">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-3xl mb-8 text-gray-700 font-bold mr-auto">
          Ready to post,{' '}
          <span className="text-pink-600">{user.name.split(' ')[0]}</span>?
        </h1>
        <div className="mb-5 mr-auto block w-full">
          <PostInput
            Icon={PencilIcon}
            label="Give your post a title"
            id="title"
            placeholder="My new epic website"
            value={title}
            setValue={setTitle}
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
          />
        </div>
        <div className="mb-10 mr-auto grid md:grid-cols-2 gap-4 w-full">
          <PostInput
            Icon={LinkIcon}
            label="Deployed website URL"
            id="live-demo"
            placeholder="https://nitinranganath.me"
            value={liveDemo}
            setValue={setLiveDemo}
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
        <ImageDropzone setImages={setImages} />
        {images.length > 0 && (
          <ThumbnailsDND images={images} setImages={setImages} />
        )}
      </div>
    </div>
  );
};

export default NewPost;
