import Navbar from '../components/utils/Navbar';
import MyStepper from '../components/utils/MyStepper';
import FileUploader from '../components/utils/FileUploader';
import Questions from '../components/visualizacion/Question';
import { Button, Box } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../components/context/authContext';
import { useEffect } from 'react';

/**
 * Módulo visualización
 * @function
 */
const Visualizacion = () => {
  const [step, setStep] = useState(0);
  const steps = ['Subir archivos', 'Configurar gráficas'];
  const fileTypes = {
    word: ['docx'],
    excel: ['csv', 'Rda', 'rda'],
    power: ['pptx'],
  };
  const { user } = useAuth();

  useEffect(() => {
    console.log('visualizacion: ', user);
  }, []);

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
              0: (
                <FileUploader
                  fileTypes={fileTypes}
                  numberOfFiles={3}
                  path="files"
                />
              ),
              1: <Questions />,
            }[step]
          }
        </Box>
      </Box>
      {step === 0 ? (
        <Box display={'flex'} justifyContent={'flex-end'} mr={8} mb={3}>
          <Button
            size="medium"
            variant="contained"
            onClick={() => setStep(step + 1)}
          >
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
