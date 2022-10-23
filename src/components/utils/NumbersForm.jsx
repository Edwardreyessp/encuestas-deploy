import { Card, TextField } from '@mui/material';
import { Stack } from '@mui/system';

const NumbersForm = () => {
  const inputsArr = [
    { label: 'Número de puntos', id: 'a' },
    { label: 'Número de entrevistas', id: 'b' },
    { label: 'Número de muestras', id: 'c' },
  ];
  return (
    <Card>
      <Stack>
        {inputsArr.map(item => {
          return <TextField label={item.label} type="number" key={item.id} />;
        })}
      </Stack>
    </Card>
  );
};
export default NumbersForm;
