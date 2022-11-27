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
import { sendConfig, sendEstratos } from '../services/Index';

/**
 * Module 5
 * @function
 */
const Posestratificacion = () => {
  const [step, setStep] = useState(0);
  const steps = ['Subir archivos', 'Configurar estratos', 'Llenar estratos'];
  const [opciones, setOpciones] = useState({
    a: ['a', 'b', 'c'],
    b: ['d', 'e', 'f'],
  });
  // const opciones = ['a', 'b', 'c'];
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
   * Envía la configuración
   * @function
   */
  const sendToBackendConfig = async () => {
    const response = await sendConfig(data);
    setOpciones(response);
  };

  /**
   * Envía los estratos
   * @function
   * @param {json} dataEstratos - Json de esratos, nombres y sub estratos
   */
  const sendToBackendEstratos = async dataEstratos => {
    const sendData = {
      Estratos: dataEstratos,
    };
    const response = await sendEstratos(sendData);
    console.log(response);
  };

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
        if (flag) sendToBackendConfig();
        break;
      case 2:
        flag = isEstratosDone(estratos) && isEstratosDone(estratos2);
        if (flag) {
          let dataEstratos = [
            {
              name: data.variables[0].label,
              sub_estratos: estratos,
            },
          ];
          if (estratos2.length !== 0) {
            dataEstratos = [
              ...dataEstratos,
              {
                name: data.variables[1].label,
                sub_estratos: estratos2,
              },
            ];
          }
          // console.log(dataEstratos);
          sendToBackendEstratos(dataEstratos);
        }
        flag = false;
        break;

      default:
        break;
    }

    if (flag) setStep(step + 1);
  };

  const fileTypes = {
    excel: ['cvs', 'Rda', 'xlsx', 'rda'],
  };

  return (
    <>
      <Navbar current={'posestratificacion'} />
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Stack>
          <Box margin={'36px 0'} width={'880px'}>
            <MyStepper steps={steps} activeStep={step} setStep={setStep} />
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
                                opciones={Object.values(opciones)[index]}
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
