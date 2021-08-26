import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, setValue }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
  ];

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
