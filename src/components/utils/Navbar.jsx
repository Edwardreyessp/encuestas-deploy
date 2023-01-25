import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

/**
 * Represents the Navbar.
 * @function
 * @param {string} current - Name of the current route.
 */
const Navbar = ({ current }) => {
  /**
   * Represents the Style of a Chip component.
   * @constructor
   * @param {Theme} theme - Base theme.
   */
  const StyledChip = styled(Chip)(({ theme }) => {
    return {
      height: theme.spacing(4),
      color: 'white',
      fontSize: 18,
      fontFamily: 'inherit',
      '&:hover, &:focus': {
        backgroundColor: '#418ad2',
      },
    };
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/sing-in');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nombre de la empresa
          </Typography>
          <Link to={'/muestreo'} style={{ textDecoration: 'none' }}>
            <StyledChip
              component="a"
              // href="/muestreo"
              label="Muestreo"
              sx={{
                backgroundColor: current === 'muestreo' ? '#005cb8' : 'inherit',
              }}
            />
          </Link>
          <Link to={'/posestratificacion'} style={{ textDecoration: 'none' }}>
            <StyledChip
              component="a"
              // href="/posestratificacion"
              label="Posestratificación"
              sx={{
                backgroundColor:
                  current === 'posestratificacion' ? '#005cb8' : 'inherit',
              }}
            />
          </Link>
          <Link to={'/visualizacion'} style={{ textDecoration: 'none' }}>
            <StyledChip
              component="a"
              // href="/visualizacion"
              label="Visualización"
              sx={{
                backgroundColor:
                  current === 'visualizacion' ? '#005cb8' : 'inherit',
              }}
            />
          </Link>
          <StyledChip
            onClick={handleLogout}
            label="Cerrar sesión"
            sx={{ backgroundColor: 'inherit' }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
