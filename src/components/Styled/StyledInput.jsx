import { Paper, TextField } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export const InputStartIcon = ({
  placeholder = '',
  value = '',
  name = '',
  onChange = () => {},
  icon = <PersonOutlineOutlinedIcon sx={{ color: '#9D9D9D' }} />,
  error = false,
}) => {
  // const color = '#9D9D9D';
  return (
    <Paper
      elevation={2}
      sx={{
        p: '2px 10px',
        display: 'flex',
        alignItems: 'center',
        width: 376,
        minHeight: 55,
        bgcolor: '#F4F8F7',
      }}
    >
      {icon}
      <TextField
        sx={{ ml: 1, input: { bgcolor: '#F4F8F7' } }}
        label={placeholder}
        name={name}
        variant="filled"
        fullWidth
        error={error}
        helperText={error && 'Ingresa un correo'}
        value={value}
        onChange={e => onChange(e)}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Paper>
  );
};
