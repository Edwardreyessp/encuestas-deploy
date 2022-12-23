import { Card, TextField } from '@mui/material';
import { Stack } from '@mui/system';

const InputsList = ({ inputsArr, handleInput }) => {
  return (
    <Card sx={{ minWidth: '300px' }}>
      <Stack>
        {inputsArr.map((item, i) => {
          return (
            <TextField
              sx={{ margin: '1rem' }}
              label={item.label}
              type={item.type}
              key={`${i}-mix-input`}
              value={item.value}
              onChange={handleInput}
              name={item.id}
            />
          );
        })}
      </Stack>
    </Card>
  );
};
export default InputsList;
