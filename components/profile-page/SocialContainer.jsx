import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiFillInstagram,
} from 'react-icons/ai';
import { GoBrowser } from 'react-icons/go';

const SocialContainer = ({ social }) => {
  return (
    <>
      {social?.github && (
        <a
          href={`https://github.com/${social?.github}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center mb-2 text-gray-700 cursor-pointer hover:text-pink-600 transition"
        >
          <AiFillGithub className="h-6 w-6 mr-2" /> <p>{social?.github}</p>
        </a>
      )}
      {social?.website && (
        <a
          href={`https://${social?.website}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center mb-2 text-gray-700 cursor-pointer hover:text-pink-600 transition"
        >
          <GoBrowser className="h-6 w-6 mr-2" /> <p>{social?.website}</p>
        </a>
      )}
      {social?.twitter && (
        <a
          href={`https://twitter.com/${social?.twitter}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center mb-2 text-gray-700 cursor-pointer hover:text-pink-600 transition"
        >
          <AiFillTwitterCircle className="h-6 w-6 mr-2" />{' '}
          <p>{social?.twitter}</p>
        </a>
      )}
      {social?.instagram && (
        <a
          href={`https://instagram.com/${social?.instagram}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center mb-2 text-gray-700 cursor-pointer hover:text-pink-600 transition"
        >
          <AiFillInstagram className="h-6 w-6 mr-2" />{' '}
          <p>{social?.instagram}</p>
        </a>
      )}
      {social?.linkedin && (
        <a
          href={`https://linkedin.com/in/${social?.linkedin}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center mb-2 text-gray-700 cursor-pointer hover:text-pink-600 transition"
        >
          <AiFillLinkedin className="h-6 w-6 mr-2" /> <p>{social?.linkedin}</p>
        </a>
      )}
      {social?.youtube && (
        <a
          href={`https://youtube.com/c/${social?.youtube}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center mb-2 text-gray-700 cursor-pointer hover:text-pink-600 transition"
        >
          <AiFillYoutube className="h-6 w-6 mr-2" /> <p>{social?.youtube}</p>
        </a>
      )}
    </>
  );
};

export default SocialContainer;
