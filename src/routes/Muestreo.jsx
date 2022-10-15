import Navbar from '../components/utils/Navbar';
import FileUploader from '../components/utils/FileUploader';

const Muestreo = () => {
  const fileTypes = {
    excel: ['csv', 'xlsx', 'xlsm', 'xlsb', 'xltx'],
    rda: ['rda', 'Rda'],
  };

  return (
    <>
      <Navbar />
      <FileUploader numberOfFiles={2} fileTypes={fileTypes} />
    </>
  );
};

export default Muestreo;
