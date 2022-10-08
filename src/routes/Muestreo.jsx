import Navbar from '../components/utils/Navbar';
import FileUploader from '../components/utils/FileUploader';
import Button from '@mui/material/Button';

const Muestreo = () => {
  return (
    <>
      <Navbar />
      <FileUploader />
      <Button variant="contained">Hello</Button>
    </>
  );
};

export default Muestreo;
