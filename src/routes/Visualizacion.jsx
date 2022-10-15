import Navbar from '../components/utils/Navbar';
import MyStepper from '../components/utils/MyStepper';
import FileUploader from '../components/utils/FileUploader';
import Questions from '../components/visualizacion/Question';
import { Button, Box, Stack } from '@mui/material';
import { useState } from 'react';

/**
 * Módulo visualización
 * @function
 */
const Visualizacion = () => {
  const [step, setStep] = useState(0);
  const steps = ['Subir archivos', 'Configurar gráficas'];

  return (
    <>
      <Navbar current={'visualizacion'} />
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Stack>
          <Box m={'36px 0'}>
            <MyStepper steps={steps} activeStep={step} />
          </Box>
          {
            {
              0: <FileUploader />,
              1: <Questions />,
            }[step]
          }
        </Stack>
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
