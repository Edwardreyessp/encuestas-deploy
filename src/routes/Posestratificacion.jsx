import { useState } from 'react';
import Navbar from '../components/utils/Navbar';
import MyStepper from '../components/utils/MyStepper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FileUploader from '../components/utils/FileUploader';
import Estratos, { isEstratosDone } from '../components/utils/Estratos';
import ConfigEstratos, {
  isConfigEstratosDone,
} from '../components/utils/ConfigEstratos';

/**
 * Module 5
 * @function
 */
const Posestratificacion = () => {
  const [step, setStep] = useState(0);
  const steps = ['Subir archivos', 'Configurar estratos', 'Llenar estratos'];
  const opciones = ['a', 'b', 'c'];
  const niveles = [
    'Nacional',
    'Circunscripciones',
    'Estatal',
    'Municipal',
    'Distritos locales',
    'Distritos federales',
    'Secciones',
  ];
  const opcEstratos = [
    'Circunscripciones',
    'Estados',
    'Municipios',
    'Distritos locales',
    'Distritos federales',
    'Secciones',
  ];
  const [estratos, setEstratos] = useState([]);
  const [estratos2, setEstratos2] = useState([]);
  const [data, setData] = useState({});

  /**
   * Valids if the step can change
   * @function
   */
  const handleStep = () => {
    let flag = false;
    switch (step) {
      case 0:
        flag = true;
        break;
      case 1:
        flag = isConfigEstratosDone(data);
        break;
      case 2:
        flag = isEstratosDone(estratos) && isEstratosDone(estratos2);
        break;

      default:
        break;
    }
    if (flag) setStep(step + 1);
  };

  const fileTypes = {
    excel: ['cvs', 'Rda', 'xlsx'],
  };

  return (
    <>
      <Navbar current={'posestratificacion'} />
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Stack>
          <Box margin={'36px 0'} width={'880px'}>
            <MyStepper steps={steps} activeStep={step} />
          </Box>
          <Box display={'flex'} justifyContent={'center'}>
            {
              {
                0: (
                  <Box mb={3}>
                    <FileUploader
                      fileTypes={fileTypes}
                      numberOfFiles={3}
                      path="files"
                    />
                  </Box>
                ),
                1: (
                  <Box mb={3}>
                    <ConfigEstratos
                      niveles={niveles}
                      estratos={opcEstratos}
                      data={data}
                      setData={setData}
                    />
                  </Box>
                ),
                2: (
                  <Stack>
                    {data.variables !== undefined
                      ? data.variables.map((option, index) => {
                          return (
                            <Box key={index} mb={3}>
                              <Estratos
                                estratos={index === 0 ? estratos : estratos2}
                                setEstratos={
                                  index === 0 ? setEstratos : setEstratos2
                                }
                                opciones={opciones}
                                numEstratos={option.value}
                                nombre={option.label}
                              />
                            </Box>
                          );
                        })
                      : ''}
                  </Stack>
                ),
              }[step]
            }
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mr={8} mb={3}>
            <Button size="medium" variant="contained" onClick={handleStep}>
              {step === 2 ? 'Descargar visualización' : 'Siguiente'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Posestratificacion;
