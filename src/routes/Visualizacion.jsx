import Navbar from '../components/utils/Navbar';
import MyStepper from '../components/utils/MyStepper';
import FileUploader from '../components/utils/FileUploader';
import Questions from '../components/visualizacion/Question';
import { Button, Box } from '@mui/material';
import { useState } from 'react';
import { uploadFiles } from '../services/Index';

/**
 * Módulo visualización
 * @function
 */
const Visualizacion = () => {
  const [step, setStep] = useState(0);
  const steps = ['Subir archivos', 'Configurar gráficas'];
  const fileTypes = { word: ['.docx'], excel: ['.csv'], power: ['.pptx'] };

  /**
   * Temp FileUploader
   * @function
   */
  const handleUploadFiles = async () => {
    const files = {
      word: 'https://firebasestorage.googleapis.com/v0/b/proyectoencuestas1-f2ece.appspot.com/o/cuestionario_2.docx?alt=media&token=8ebcb95e-2de2-449f-9c0d-f64a3f3c8fd4',
      excel:
        'https://firebasestorage.googleapis.com/v0/b/proyectoencuestas1-f2ece.appspot.com/o/data_ejemplo.csv?alt=media&token=59b20a31-5afe-4590-8c93-1cffa25911a1',
      power:
        'https://firebasestorage.googleapis.com/v0/b/proyectoencuestas1-f2ece.appspot.com/o/default_pptx%2Fdefault.pptx?alt=media&token=918daf7b-396f-48f7-a7b6-0ef22a0e317a',
    };
    const response = await uploadFiles(files, 'files');
    console.log(response.data);
    setStep(step + 1);
  };

  return (
    <>
      <Navbar current={'visualizacion'} />
      <Box width={'100vw'} display={'flex'} justifyContent={'center'}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Box
            m={'36px 0'}
            width={'100vw'}
            display={'flex'}
            justifyContent={'center'}
          >
            <MyStepper steps={steps} activeStep={step} setStep={setStep} />
          </Box>
          {
            {
              0: <FileUploader fileTypes={fileTypes} numberOfFiles={3} />,
              1: <Questions />,
            }[step]
          }
        </Box>
      </Box>
      {step === 0 ? (
        <Box display={'flex'} justifyContent={'flex-end'} mr={8} mb={3}>
          <Button size="medium" variant="contained" onClick={handleUploadFiles}>
            Siguiente
          </Button>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default Visualizacion;
