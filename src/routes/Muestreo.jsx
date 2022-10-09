import Navbar from '../components/utils/Navbar';
import FileUploader from '../components/utils/FileUploader';

const Muestreo = () => {
  return (
    <>
      <Navbar />
      <FileUploader numberOfFiles={2} fileTypes=".Rda" />
    </>
  );
};

export default Muestreo;
