import {
  Box,
  Button,
  createTheme,
  IconButton,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import googleIcon from '../assets/images/google.svg';
import Navbar from '../components/utils/Navbar';
// Icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const SingIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = mainColor => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      contrast: createColor('#FFFFFF'),
      primary: createColor('#1976D2'),
      mygray: createColor('#9D9D9D'),
    },
  });

  return (
    <>
      <Navbar current={'singin'} />
      <ThemeProvider theme={theme}>
        <Box display={'flex'} height="calc(100vh - 64px)" width={'100vw'}>
          <Stack
            sx={{ bgcolor: '#1976D2' }}
            alignItems="center"
            justifyContent="center"
            paddingX={'88px'}
            spacing={2}
          >
            <Typography
              color={'white'}
              fontSize={40}
              fontWeight={700}
              width="405px"
            >
              ¡Bienvenido de vuelta!
            </Typography>
            <Typography
              fontSize={20}
              color="white"
              width={'395px'}
              textAlign="center"
            >
              Para mantenerse conectado, por favor inicia sesión con tu cuenta
              personal.
            </Typography>

            <Button
              variant="outlined"
              color="contrast"
              sx={{ borderRadius: '50px' }}
            >
              INICIAR SESIÓN
            </Button>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="center"
            paddingX={'88px'}
            spacing={2}
            width="100%"
          >
            <Typography fontSize={40} color="#1976D2" fontWeight={700}>
              Crea una Cuenta
            </Typography>
            <Button
              variant="contained"
              sx={{ width: '376px' }}
              startIcon={
                <img
                  width={23}
                  style={{ borderRadius: '2px' }}
                  src={googleIcon}
                />
              }
            >
              Iniciar sesión con Google
            </Button>
            <Typography color={'#9D9D9D'}>
              O usa un correo para registrarte:
            </Typography>
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
              <PersonOutlineOutlinedIcon sx={{ color: '#9D9D9D' }} />
              <TextField
                sx={{ ml: 1, input: { bgcolor: '#F4F8F7' } }}
                label="Nombre"
                variant="filled"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Paper>
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
              <MailOutlinedIcon sx={{ color: '#9D9D9D' }} />
              <TextField
                sx={{ ml: 1, input: { bgcolor: '#F4F8F7' } }}
                label="Correo"
                variant="filled"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Paper>
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
              <LockOutlinedIcon sx={{ color: '#9D9D9D' }} />
              <TextField
                sx={{ ml: 1, input: { bgcolor: '#F4F8F7' } }}
                label="Contraseña"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Paper>
            <Button variant="contained" sx={{ borderRadius: '50px', mt: 100 }}>
              REGISTRARSE
            </Button>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SingIn;
