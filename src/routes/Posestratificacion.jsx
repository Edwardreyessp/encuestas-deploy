import { useState } from 'react';
import Navbar from '../components/utils/Navbar';
import Data from '../components/posestratificacion/Data';
import MyStepper from '../components/utils/MyStepper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FileUploader from '../components/utils/FileUploader';
import Estratos from '../components/utils/Estratos';

const Posestratificacion = () => {
  const [step, setStep] = useState(0);
  const steps = ['Subir archivos', 'Configurar estratos', 'Llenar estratos'];
  const opciones = ['a', 'b', 'c'];
  const [estratos, setEstratos] = useState([]);

  return (
    <>
      <Navbar />
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Stack>
          <Box margin={'36px 0'} width={'880px'}>
            <MyStepper steps={steps} activeStep={step} />
          </Box>
          <Box display={'flex'} justifyContent={'center'} mb={3}>
            {
              {
                0: <FileUploader />,
                1: <Data />,
                2: (
                  <Estratos
                    estratos={estratos}
                    setEstratos={setEstratos}
                    opciones={opciones}
                    numEstratos={2}
                    nombre={'Estrato'}
                  />
                ),
              }[step]
            }
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mr={8} mb={3}>
            <Button
              size="medium"
              variant="contained"
              onClick={() => setStep(step + 1)}
            >
              {step === 2 ? 'Descargar visualización' : 'Siguiente'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Posestratificacion;
