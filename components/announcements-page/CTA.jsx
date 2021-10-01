import { useState } from 'react';
import ContactModal from './ContactModal';

const CTA = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Found a bug or issue?</span>
          <span className="block">Report it on GitHub</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="https://github.com/itsnitinr/driwwwle-v2/issues/new"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
              target="_blank"
              rel="noreferrer"
            >
              Open Issue
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <a
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200"
            >
              Contact Us
            </a>
            <ContactModal open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
