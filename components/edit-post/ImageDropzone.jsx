import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotographIcon } from '@heroicons/react/outline';

const ImageDropzone = ({ setImages, setIsOriginalImages }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setImages(acceptedFiles);
    setIsOriginalImages(false);
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
    <div
      className="bg-white cursor-pointer shadow-md rounded-xl p-8 w-full text-center"
      {...getRootProps()}
    >
      <div className="border-2 border-dashed divide-x rounded-md p-10 border-pink-600 flex flex-col justify-center items-center">
        <input {...getInputProps()} />
        <PhotographIcon className="w-16 h-16 mb-4 text-pink-600" />
        <p className="text-lg font-semibold mb-1">
          Drop your images here or <span className="text-pink-600">browse</span>
        </p>
        <p className="text-md text-gray-400">
          Max 5 images. 16:9 aspect ratio recommended.
        </p>
      </div>
    </div>
  );
};

export default ImageDropzone;
