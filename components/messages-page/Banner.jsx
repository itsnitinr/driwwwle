import Image from 'next/image';

const Banner = ({ banner }) => {
  return (
    <div className="border-b border-gray-200 flex items-center space-x-2 p-2 sticky">
      <Image
        src={banner.profilePicUrl}
        height={32}
        width={32}
        className="rounded-full object-cover"
      />
      <h3 className="font-semibold text-xl text-gray-600">{banner.name}</h3>
    </div>
  );
};

export default Banner;
