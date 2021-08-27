import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, setValue }) => {
  const modules = {
    toolbar: [['bold', 'italic', 'underline', 'strike', 'blockquote']],
  };

  const formats = ['bold', 'italic', 'underline', 'strike', 'blockquote'];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={(value) => setValue(value)}
      className="bg-white mb-8 w-full h-full"
      modules={modules}
      formats={formats}
    />
  );
};

export default RichTextEditor;
