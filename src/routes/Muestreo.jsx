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
  CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import ConfigEstratos from '../components/utils/ConfigEstratos';
import Estratos from '../components/utils/Estratos';
import MixStratumsComponent from '../components/utils/MixStratumsComponent';
import { v4 as uuidv4 } from 'uuid';
import InputsList from '../components/utils/InputsList';
import { axiosPost } from '../services/Index';
import { useUrl } from '../components/context/BaseUrl';
import CreateTable from '../../CreateTable';
const PATH = 'muestreo/core';

// TODO: investigar como renderizar un csv
// TODO: lógica para regresar a configurar la proporción de los estratos

const Muestreo = () => {
  /**
   * ===========States================
   */
  const { url } = useUrl();

  /**
   * Page config
   */
  const [step, setStep] = useState(0);
  /**
   * Step 1 config
   */
  const [data, setData] = useState({});
  const [isLoadingUniques, setIsLoadingUniques] = useState(true);
  /**
   * Step 2 config
   */
  const [estratos, setEstratos] = useState([]);
  const [estratos2, setEstratos2] = useState([]);
  /**
   * Step 4 config
   */
  const stepFourScheme = [
    {
      label: 'Número de puntos',
      id: uuidv4(),
      value: 0,
      type: 'number',
      name: 'numberOfPoints',
    },
    {
      label: 'Número de entrevistas',
      id: uuidv4(),
      value: 0,
      type: 'number',
      name: 'numberOfInterviews',
    },
    {
      label: 'Número de muestras',
      id: uuidv4(),
      value: 0,
      type: 'number',
      name: 'numberOfSamples',
    },
  ];
  const [stepFourArr, setStepFourArr] = useState(stepFourScheme);

  /**
   * Step 4 config
   */
  const [stepFiveArr, setStepFiveArr] = useState([]);

  useEffect(() => {
    const newArr = mixStratums(estratos, estratos2);
    setStepFiveArr(newArr);
  }, [estratos, estratos2]);

  /**
   * Sample types
   */
  const [sampleType, setSampleType] = useState(null);

  function handleSampleTypeChange(e) {
    setSampleType(e.target.value);
  }
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
    'ID del Estado',
    'Municipios',
    'ID del Municipio',
    'Distritos locales',
    'Distritos federales',
    'Secciones',
  ];
  /**
   * Step 2 config
   */
  const [opciones, setOpciones] = useState([]);
  const [opcionesDos, setOpcionesDos] = useState([]);
  /**
   * Step 4 config
   */

  /**
   * Step 5 config
   */

  /**
   * ===========Methods================
   */
  function handleNextStep() {
    if (step === 1) {
      requestUniques();
    } else if (step === 4 && !(sampleType === 'custom')) {
      setStep(curr => ++curr);
    } else if (step === 5) {
      // const payload = buildPayload();
      // axiosPost(payload, `${url}/muestreo/step_2`);
    }
    setStep(curr => ++curr);
  }

  /**
   * TODO: refactor the function DRY
   * Handles the input values
   * @function
   * @param {event} e - the onChange event
   * @ return {void} updates the component state
   */

  function handleStepFourInput(e) {
    const { name, value } = e.target;
    const selectedInput = stepFourArr.find(e => e.id === name);
    const selectedIdx = stepFourArr.indexOf(selectedInput);
    setStepFourArr(
      stepFourArr.map((input, i) => {
        if (i === selectedIdx) {
          input.value = value;
          return input;
        } else {
          return input;
        }
      })
    );
  }

  /**
   * Handles the input values
   * @function
   * @param {event} e - the onChange event
   * @ return {void} updates the component state
   */
  function handleStepFiveInput(e) {
    const { name, value } = e.target;
    const selectedInput = stepFiveArr.find(e => e.id === name);
    const selectedIdx = stepFiveArr.indexOf(selectedInput);
    setStepFiveArr(
      stepFiveArr.map((input, i) => {
        if (i === selectedIdx) {
          input.value = value;
          return input;
        } else {
          return input;
        }
      })
    );
  }

  /**
   * Mixes two stratums arrays
   * @function
   * @param {array} arrOne, arrTwo - The arrays of stratums to be mixed
   * returns {array} - The array of mixed stratums
   */
  function mixStratums(arrOne, arrTwo) {
    const mixedStratums = [];
    if (arrTwo.length === 0) {
      return arrOne.map(stratum => {
        return {
          label: `${stratum.nombre} `,
          id: uuidv4(),
          value: 0,
        };
      });
    }
    for (let firstStratum of arrOne) {
      for (let secondStratum of arrTwo) {
        const scheme = {
          label: `${firstStratum.nombre} / ${secondStratum.nombre}`,
          id: uuidv4(),
          value: 0,
        };
        mixedStratums.push(scheme);
      }
    }
    return mixedStratums;
  }

  function setPayloadEstratums(name, subStratums) {
    return {
      name: name || 'empty',
      sub_estratos: subStratums || 'empty',
    };
  }

  function getInputValue(name, inputsArr) {
    const input = inputsArr.find(input => input.name === name);
    return input.value || 'empty';
  }

  function buildPayload() {
    const stratumsIds = data.variables.map(v => v.label);
    const firstStratum = setPayloadEstratums(data.variables[0].label, estratos);
    const secondStratum = data.variables[1]
      ? setPayloadEstratums(data.variables[1].label, estratos2)
      : {};

    const payloadJSON = {
      Nivel: data.nivel,
      Estratos_Ids: stratumsIds,
      Estratos: [firstStratum, secondStratum],
      puntos: getInputValue('numberOfPoints', stepFourArr),
      entrevistas: getInputValue('numberOfInterviews', stepFourArr),
      muestras: getInputValue('numberOfSamples', stepFourArr),
      sampleType: sampleType,
      proportions: stepFiveArr,
    };
    return payloadJSON;
  }

  const fileTypes = { excel: ['csv'] };

  async function requestUniques() {
    const stratumsIds = data.variables.map(v => v.label);
    const payload = { Estratos_Ids: stratumsIds };
    const res = await axiosPost(payload, `${url}/${PATH}`);
    const uniques = res.data.uniques;

    const stratums = stratumsIds.map(id => {
      return {
        id: id,
        uniques: getUniquesValues(id, uniques),
      };
    });

    setOpciones(stratums[0].uniques);
    if (stratums[1]) setOpcionesDos(stratums[1].uniques);
    setIsLoadingUniques(false);
  }

  function getUniquesValues(variableID, uniques) {
    const variable = uniques.find(item => variableID === item.name);
    return variable.values;
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
                0: (
                  <FileUploader
                    numberOfFiles={1}
                    path={`${url}/files`}
                    fileTypes={fileTypes}
                  />
                ),
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
                              {isLoadingUniques ? (
                                <CircularProgress />
                              ) : (
                                <Estratos
                                  estratos={index === 0 ? estratos : estratos2}
                                  setEstratos={
                                    index === 0 ? setEstratos : setEstratos2
                                  }
                                  opciones={
                                    index === 0 ? opciones : opcionesDos
                                  }
                                  numEstratos={option.value}
                                  nombre={option.label}
                                />
                              )}
                            </Box>
                          );
                        })
                      : ''}
                  </Stack>
                ),
                3: (
                  <InputsList
                    inputsArr={stepFourArr}
                    handleInput={handleStepFourInput}
                  />
                ),
                4: <SampleType handleChange={handleSampleTypeChange} />,
                5: (
                  <MixStratumsComponent
                    stratumsArr={stepFiveArr}
                    inputHandler={handleStepFiveInput}
                  />
                ),
                6: <CreateTable />,
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

const SampleType = ({ handleChange }) => {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel>Tipo de muestreo</InputLabel>
        <Select label="Tipo de muestreo" onChange={handleChange}>
          <MenuItem value={'fair'}>Muestreo equitativo</MenuItem>
          <MenuItem value={'proportional'}>Muestreo proporcional</MenuItem>
          <MenuItem value={'custom'}>Muestreo customizado</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
export default Muestreo;
