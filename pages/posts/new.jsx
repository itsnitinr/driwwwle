import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotographIcon } from '@heroicons/react/outline';

const NewPost = ({ user }) => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setImages(acceptedFiles);
  }, []);

  const onDropRejected = () => {
    alert('Please drop upto 5 image files only!');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 5,
    accept: 'image/*',
    onDropRejected,
  });

  return (
    <div className="bg-pink-50 px-6 md:px-20 xl:px-32 py-10">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-3xl mb-10 text-gray-700 font-bold mr-auto">
          Ready to post,{' '}
          <span className="text-pink-600">{user.name.split(' ')[0]}</span>?
        </h1>
        <div
          className="bg-white cursor-pointer shadow-md rounded-xl p-8 w-full text-center"
          {...getRootProps()}
        >
          <div className="border-2 border-dashed divide-x rounded-md p-10 border-pink-600 flex flex-col justify-center items-center">
            <input {...getInputProps()} />
            <PhotographIcon className="w-16 h-16 mb-4 text-pink-600" />
            <p className="text-lg font-semibold mb-1">
              Drop your images here or{' '}
              <span className="text-pink-600">browse</span>
            </p>
            <p className="text-md text-gray-400">Maximum 5 image files only</p>
          </div>
        </div>
        {images.length > 0 && (
          <div className="my-6">
            <h3 className="text-xl mb-1 font-semibold text-pink-600">
              Arrange Images
            </h3>
            <p className="mb-4 text-gray-500">
              The first image will be used as the thumbnail
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {images.map((image) => (
                <img
                  key={image.path}
                  src={URL.createObjectURL(image)}
                  className="w-full h-full rounded-lg shadow cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPost;
