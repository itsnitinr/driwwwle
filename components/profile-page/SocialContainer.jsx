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
        <a className="flex items-center mb-2 text-gray-700">
          <AiFillGithub className="h-6 w-6 mr-2" /> <p>{social?.github}</p>
        </a>
      )}
      {social?.website && (
        <a className="flex items-center mb-2 text-gray-700">
          <GoBrowser className="h-6 w-6 mr-2" /> <p>{social?.website}</p>
        </a>
      )}
      {social?.twitter && (
        <a className="flex items-center mb-2 text-gray-700">
          <AiFillTwitterCircle className="h-6 w-6 mr-2" />{' '}
          <p>{social?.twitter}</p>
        </a>
      )}
      {social?.instagram && (
        <a className="flex items-center mb-2 text-gray-700">
          <AiFillInstagram className="h-6 w-6 mr-2" />{' '}
          <p>{social?.instagram}</p>
        </a>
      )}
      {social?.linkedin && (
        <a className="flex items-center mb-2 text-gray-700">
          <AiFillLinkedin className="h-6 w-6 mr-2" /> <p>{social?.linkedin}</p>
        </a>
      )}
      {social?.youtube && (
        <a className="flex items-center mb-2 text-gray-700">
          <AiFillYoutube className="h-6 w-6 mr-2" /> <p>{social?.youtube}</p>
        </a>
      )}
    </>
  );
};

export default SocialContainer;
