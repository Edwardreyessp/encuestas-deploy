import Navbar from '../components/utils/Navbar';
import MyStepper from '../components/utils/MyStepper';
import FileUploader from '../components/utils/FileUploader';
import { Button, Box, Stack } from '@mui/material';
import { useState } from 'react';
import Visual from '../components/visualizacion/Visual';

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

  return (
    <>
      <Navbar current={'visualizacion'} />
      <Box width="100vw">
        <Stack alignItems="center">
          <Box m="36px 0">
            <MyStepper steps={steps} activeStep={step} setStep={setStep} />
          </Box>
          {
            {
              0: (
                <Stack alignItems="flex-end" spacing={4}>
                  <FileUploader
                    fileTypes={fileTypes}
                    numberOfFiles={3}
                    path="files"
                  />
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={() => setStep(step + 1)}
                  >
                    Siguiente
                  </Button>
                </Stack>
              ),
              1: <Visual />,
            }[step]
          }
        </Stack>
      </Box>
    </>
  );
};

export default Visualizacion;
