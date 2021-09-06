import axios from 'axios';
import cookie from 'js-cookie';

import baseURL from './baseURL';

const getUserInfo = async (userId) => {
  try {
    const { data } = await axios.get(`${baseURL}/api/chats/user/${userId}`, {
      headers: { Authorization: cookie.get('token') },
    });
    return { name: data.name, profilePicUrl: data.profilePicUrl };
  } catch (error) {
    console.error(error);
  }
};

export default getUserInfo;
