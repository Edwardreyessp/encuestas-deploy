import { useState } from 'react';
import Navbar from '../components/utils/Navbar';
import Data from '../components/posestratificacion/Data';
import Files from '../components/posestratificacion/Files';
import MyStepper from '../components/utils/MyStepper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const Posestratificacion = () => {
  const [step, setStep] = useState(0);
  const steps = ['Subir archivos', 'Configurar estratos', 'Llenar estratos'];

  return (
    <>
      <Navbar />
      <Box width={'100%'}>
        <Stack>
          <Box margin={'36px 0'} width={'880px'}>
            <MyStepper steps={steps} activeStep={step} />
          </Box>
          {
            {
              1: <Files />,
              2: <Data />,
              3: <Files />,
            }[step]
          }
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Button onClick={() => setStep(step + 1)}>Continuar</Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Posestratificacion;
