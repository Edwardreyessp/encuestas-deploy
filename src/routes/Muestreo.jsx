import { useMemo } from 'react';
import Navbar from '../components/utils/Navbar';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const Muestreo = () => {
  const uppy = useMemo(() => {
    return new Uppy({
      id: 'uppy1',
      autoProceed: false,
      restrictions: {
        allowedFileTypes: ['.mp4'],
      },
      allowMultipleUploads: false,
    });
  }, []);
  return (
    <>
      <Navbar />
      <p>test</p>
      <Dashboard uppy={uppy} />
    </>
  );
};

export default Muestreo;
