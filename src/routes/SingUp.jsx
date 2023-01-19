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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { InputStartIcon } from '../components/Styled/StyledInput';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/authContext';

const SingUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // INPUTS
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  // CUSTOM COLOR
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = mainColor => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      contrast: createColor('#FFFFFF'),
      mygray: createColor('#9E9E9E'),
    },
  });

  const { signup } = useAuth();

  const createUser = async () => {
    try {
      await signup(user.name, user.email, user.password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display={'flex'} height="100vh" width={'100vw'}>
        <Stack
          sx={{ bgcolor: theme.palette.primary.main }}
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
            <Link
              to={'/sing-in'}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              INICIAR SESIÓN
            </Link>
          </Button>
        </Stack>
        <Stack
          alignItems="center"
          justifyContent="center"
          paddingX={'88px'}
          spacing={2}
          width="100%"
        >
          <Typography fontSize={40} color="primary" fontWeight={700}>
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
          <Typography color={theme.palette.mygray.main}>
            O usa un correo para registrarte:
          </Typography>
          <InputStartIcon
            placeholder={'Nombre'}
            value={user.name}
            name={'name'}
            onChange={handleUpdate}
            icon={
              <PersonOutlineOutlinedIcon
                sx={{ color: theme.palette.mygray.main }}
              />
            }
          />
          <InputStartIcon
            placeholder={'Correo'}
            value={user.email}
            name={'email'}
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
          <Button
            variant="contained"
            sx={{ borderRadius: '50px', mt: 100 }}
            onClick={createUser}
          >
            REGISTRARSE
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default SingUp;
