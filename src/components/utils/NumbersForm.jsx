import { Card, TextField } from '@mui/material';
import { Stack } from '@mui/system';

const NumbersForm = ({ inputsArr }) => {
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
