import axios from 'axios';

const upload = async (pic) => {
  try {
    const formdata = new FormData();
    formdata.append('file', pic);
    formdata.append('upload_preset', 'driwwwle');
    formdata.append('cloud_name', 'nitinr');

    console.log(process.env.NEXT_PUBLIC_CLOUDINARY_URL);

    const res = await axios.post(
      process.env.NEXT_PUBLIC_CLOUDINARY_URL,
      formdata
    );
    return res.data.url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
