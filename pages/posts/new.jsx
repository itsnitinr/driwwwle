import { useState } from 'react';

import ImageDropzone from '../../components/new-post/ImageDropzone';
import ThumbnailsDND from '../../components/new-post/ThumbnailsDND';

const NewPost = ({ user }) => {
  const [images, setImages] = useState([]);

  return (
    <div className="bg-pink-50 px-6 md:px-20 xl:px-32 py-10">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-3xl mb-10 text-gray-700 font-bold mr-auto">
          Ready to post,{' '}
          <span className="text-pink-600">{user.name.split(' ')[0]}</span>?
        </h1>
        <ImageDropzone setImages={setImages} />
        {images.length > 0 && (
          <ThumbnailsDND images={images} setImages={setImages} />
        )}
      </div>
    </div>
  );
};

export default NewPost;
