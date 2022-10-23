import { Card, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';

const NumbersForm = () => {
  const [numberOfPoints, setNumberOfPoints] = useState(0);
  const [numberOfInterviews, setNumberOfInterviews] = useState(0);
  const [numberOfSamples, setNumberOfSamples] = useState(0);
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
  return (
    <Card sx={{ minWidth: '300px' }}>
      <Stack>
        {inputsArr.map(item => {
          return (
            <TextField
              sx={{ margin: '1rem' }}
              label={item.label}
              type="number"
              key={item.id}
              value={item.value}
              onChange={item.setValue}
            />
          );
        })}
      </Stack>
    </Card>
  );
};
export default NumbersForm;
