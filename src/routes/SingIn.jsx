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
// Icons
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { InputStartIcon } from '../components/Styled/StyledInput';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/authContext';

const SingIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  // CUSTOM COLOR
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = mainColor => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      secondary: createColor('#FFFFFF'),
      primary: createColor('#1976D2'),
      mygray: createColor('#9E9E9E'),
    },
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleUpdate = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const logIn = async () => {
    try {
      await login(user.email, user.password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display={'flex'} height="100vh" width={'100vw'}>
        <Stack
          alignItems="center"
          justifyContent="center"
          paddingX={'88px'}
          spacing={2}
          width="100%"
        >
          <Typography fontSize={40} color="primary" fontWeight={700}>
            Inicia Sesión
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
          <Typography color={theme.palette.mygray.main}>
            O usa tu cuenta de correo:
          </Typography>
          <InputStartIcon
            placeholder={'Correo'}
            name="email"
            value={user.email}
            onChange={handleUpdate}
            icon={
              <MailOutlinedIcon sx={{ color: theme.palette.mygray.main }} />
            }
          />
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
            <LockOutlinedIcon sx={{ color: theme.palette.mygray.main }} />
            <TextField
              sx={{ ml: 1, input: { bgcolor: '#F4F8F7' } }}
              label="Contraseña"
              name="password"
              variant="filled"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={user.password}
              onChange={handleUpdate}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <VisibilityOff sx={{ color: theme.palette.mygray.main }} />
              ) : (
                <Visibility sx={{ color: theme.palette.mygray.main }} />
              )}
            </IconButton>
          </Paper>
          <Typography sx={{ cursor: 'pointer' }}>
            ¿Olvidaste tu contraseña?
          </Typography>
          <Button
            variant="contained"
            sx={{ borderRadius: '50px', mt: 100 }}
            onClick={logIn}
          >
            INICIAR SESIÓN
          </Button>
        </Stack>
        <Stack
          sx={{ bgcolor: theme.palette.primary.main }}
          alignItems="center"
          justifyContent="center"
          paddingX={'88px'}
          spacing={2}
        >
          <Typography
            color={theme.palette.secondary.main}
            fontSize={40}
            fontWeight={700}
            width="405px"
            textAlign={'center'}
          >
            ¡Bienvenido!
          </Typography>
          <Typography
            fontSize={20}
            color="secondary"
            width={'395px'}
            textAlign="center"
          >
            Ingresa tus datos y regístrate para usar todos los servicios.
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: '50px' }}
          >
            <Link
              to={'/sing-up'}
              style={{
                textDecoration: 'none',
                color: theme.palette.secondary.main,
              }}
            >
              REGÍSTRATE
            </Link>
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default SingIn;
