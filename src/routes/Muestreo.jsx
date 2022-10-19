import Navbar from '../components/utils/Navbar';
import FileUploader from '../components/utils/FileUploader';
import MyStepper from '../components/utils/MyStepper';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const Muestreo = () => {
  const [step, setStep] = useState(0);
  const steps = [
    'Subir archivos',
    'Configurar muestreo',
    'Configurar estratos',
    'Tipo de muestreo',
    'Proporción de Muestreo',
    'Gráfica',
    'Tabla',
  ];

  function handleNextStep() {
    setStep(curr => ++curr);
    console.log(step);
  }
  return (
    <>
      <Navbar current="muestreo" />
      <Box padding={'3rem 0'}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <MyStepper steps={steps} activeStep={step} />
          </Grid>

          <Grid xs={12} display="flex" justifyContent="center">
            {{ 0: <FileUploader />, 1: <p>step 2</p> }[step]}
          </Grid>

          <Grid xs={12} display="flex" justifyContent="end">
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

export default Muestreo;
