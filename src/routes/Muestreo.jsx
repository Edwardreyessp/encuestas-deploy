import Navbar from '../components/utils/Navbar';
import FileUploader from '../components/utils/FileUploader';
import MyStepper from '../components/utils/MyStepper';
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormControl,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import ConfigEstratos from '../components/utils/ConfigEstratos';
import Estratos from '../components/utils/Estratos';
import MixStratumsComponent from '../components/utils/MixStratumsComponent';

const Muestreo = () => {
  /**
   * ===========States================
   */

  /**
   * Page config
   */
  const [step, setStep] = useState(0);
  /**
   * Step 1 config
   */
  const [data, setData] = useState({});
  /**
   * Step 2 config
   */
  const [estratos, setEstratos] = useState([]);
  const [estratos2, setEstratos2] = useState([]);
  /**
   * Step 4 config
   */
  const [numberOfPoints, setNumberOfPoints] = useState(0);
  const [numberOfInterviews, setNumberOfInterviews] = useState(0);
  const [numberOfSamples, setNumberOfSamples] = useState(0);

  /**
   * ===========Config variables================
   */

  /**
   * Page config
   */
  const steps = [
    'Subir archivos',
    'Configurar muestreo',
    'Configurar estratos',
    'Configurar muestras',
    'Tipo de muestreo',
    'Proporción de Muestreo',
    'Gráfica',
    'Tabla',
  ];

  /**
   * Step 1 config
   */
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
  /**
   * Step 2 config
   */
  const opciones = ['a', 'b', 'c'];
  /**
   * Step 4 config
   */
  const inputsArr = [
    {
      label: 'Número de puntos',
      id: 'a',
      value: numberOfPoints,
      setValue: event => setNumberOfPoints(event.target.value),
    },
    {
      label: 'Número de entrevistas',
      id: 'b',
      value: numberOfInterviews,
      setValue: event => setNumberOfInterviews(event.target.value),
    },
    {
      label: 'Número de muestras',
      id: 'c',
      value: numberOfSamples,
      setValue: event => setNumberOfSamples(event.target.value),
    },
  ];
  /**
   * Step 5 config
   */
  // const [proportions, setProportions] = useState({});
  // const stepFiveArr = [
  //   {
  //     label: 'Proporcion de estratos variable 1',
  //     id: 'a',
  //     value: proportion,
  //     setValue: event => setProportion(event.target.value),
  //   },
  // ];

  /**
   * ===========Methods================
   */
  function handleNextStep() {
    setStep(curr => ++curr);
  }
  return (
    <>
      <Navbar current="muestreo" />
      <Box padding={'3rem 0'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MyStepper steps={steps} activeStep={step} />
          </Grid>

          <Grid xs={12} item display="flex" justifyContent="center">
            {
              {
                0: <FileUploader numberOfFiles={2} />,
                1: (
                  <ConfigEstratos
                    niveles={niveles}
                    estratos={opcEstratos}
                    data={data}
                    setData={setData}
                  />
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
                3: '', //<NumbersForm inputsArr={inputsArr} />,
                4: <SampleType />,
                5: (
                  <MixStratumsComponent
                    firstArr={estratos}
                    secondArr={estratos2}
                  />
                ),
              }[step]
            }
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <Button
              variant="contained"
              sx={{ margin: '1rem' }}
              onClick={handleNextStep}
            >
              Siguiente
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const SampleType = () => {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel>Tipo de muestreo</InputLabel>
        <Select label="Tipo de muestreo">
          <MenuItem value={'a'}>Muestreo equitativo</MenuItem>
          <MenuItem value={'b'}>Muestreo proporcional</MenuItem>
          <MenuItem value={'c'}>Muestreo customizado</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
export default Muestreo;
