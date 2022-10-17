import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

/**
 * Stepper
 * @component
 * @param {string[]} steps - Pasos
 * @param {number} activeStep - Paso actual
 * @param {function} setStep - Setter del paso actual
 */
const MyStepper = ({ steps, activeStep, setStep }) => {
  /**
   * Permite moverse a otro step mientras sea menor que el paso actual
   * @function
   * @param {number} index - ïndice del paso
   */
  const handleBack = index => {
    if (index < activeStep && setStep !== undefined) setStep(index);
  };

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => {
        return (
          <Step key={index}>
            <StepLabel
              onClick={() => handleBack(index)}
              sx={{ cursor: 'pointer' }}
            >
              {label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default MyStepper;
