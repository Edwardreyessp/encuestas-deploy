import { Card, TextField } from '@mui/material';
import { Stack } from '@mui/system';

const MixStratumsComponent = ({ stratumsArr, inputHandler }) => {
  return (
    <Card sx={{ minWidth: '300px' }}>
      <Stack>
        {stratumsArr.map(item => {
          return (
            <TextField
              sx={{ margin: '1rem' }}
              label={item.label}
              type="number"
              key={item.id}
              value={item.value}
              onChange={inputHandler}
              name={item.id}
            />
          );
        })}
      </Stack>
    </Card>
  );
};
export default MixStratumsComponent;
