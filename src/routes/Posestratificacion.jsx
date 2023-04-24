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
import { axiosPost } from '../services/Index';
import { Typography } from '@mui/material';
import { useUrl } from '../components/context/BaseUrl';

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
  const [isLoading, setIsLoading] = useState(true);
  const [urlDownload, setUrlDownload] = useState('');
  const { url } = useUrl();

  /**
   * Envía la configuración
   * @function
   */
  const sendToBackendConfig = async () => {
    const response = await axiosPost(data, `${url}/post/conf`);
    setOpciones(response.data);
    setIsLoading(false);
  };

  /**
   * Envía los estratos
   * @function
   * @param {json} dataEstratos - Json de esratos, nombres y sub estratos
   */
  const sendToBackendEstratos = async dataEstratos => {
    console.log('dataEstratos');
    const sendData = {
      Estratos: dataEstratos,
    };
    const response = await axiosPost(sendData, `${url}/post/data`);
    setUrlDownload(response.data);
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
          sendToBackendEstratos(dataEstratos);
        }
        flag = false;
        break;

      default:
        break;
    }

    if (flag) setStep(step + 1);
  };

  const fileTypes = [
    { base: ['csv', 'Rda', 'xlsx', 'rda'] },
    { participacion: ['csv', 'Rda', 'xlsx', 'rda'] },
    { muestra: ['csv', 'Rda', 'xlsx', 'rda'] },
  ];

  if (Object.keys(opciones)[0] !== 'array') {
    return (
      <>
        <Navbar current={'posestratificacion'} />
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          <Stack>
            <Box margin={'36px 0'} width={'880px'}>
              <MyStepper steps={steps} activeStep={step} setStep={setStep} />
            </Box>
            <Stack spacing={2} alignItems="center">
              <Box>Respuesta inesperada del servidor</Box>
              <Box>Ver consola para más info</Box>
              <Box>
                <Box sx={{ mb: 2 }}>Respuesta esperada:</Box>
                <Box>{`{`}</Box>
                <Box>&nbsp;&nbsp;{`array: ['a', 'b', 'c'],`}</Box>
                <Box>&nbsp;&nbsp;{`array2: ['d', 'e', 'f']`}</Box>
                <Box>{`}`}</Box>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </>
    );
  }

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
                  <Stack mb={3} spacing={2}>
                    <Typography variant="h6">Archivo Base</Typography>
                    <FileUploader
                      fileTypes={fileTypes[0]}
                      numberOfFiles={1}
                      path={`${url}/files`}
                    />
                    <Typography variant="h6">
                      Archivo de Participación
                    </Typography>
                    <FileUploader
                      fileTypes={fileTypes[1]}
                      numberOfFiles={1}
                      path={`${url}/files`}
                    />
                    <Typography variant="h6">Archivo Muestra</Typography>
                    <FileUploader
                      fileTypes={fileTypes[2]}
                      numberOfFiles={1}
                      path={`${url}/files`}
                    />
                  </Stack>
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
                    {!isLoading &&
                      data.variables !== undefined &&
                      data.variables.map((option, index) => {
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
                      })}
                  </Stack>
                ),
              }[step]
            }
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mr={8} mb={3}>
            {step === 2 ? (
              urlDownload === '' ? (
                <Button size="medium" variant="contained" onClick={handleStep}>
                  Enviar datos
                </Button>
              ) : (
                <Button
                  size="medium"
                  variant="contained"
                  color="success"
                  href={urlDownload}
                  rel="noopener noreferrer"
                  target={'_blank'}
                >
                  Descargar visualización
                </Button>
              )
            ) : (
              <Button size="medium" variant="contained" onClick={handleStep}>
                Siguiente
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Posestratificacion;
