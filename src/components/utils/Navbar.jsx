import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useUrl } from '../context/BaseUrl';
import { Button } from '@mui/material';

/**
 * Represents the Navbar.
 * @function
 * @param {string} current - Name of the current route.
 */
const Navbar = ({ current }) => {
  const { url, setUrl } = useUrl();
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

  const handleUrl = () => {
    if (url === 'https://encuestas1.herokuapp.com') {
      setUrl('https://34.74.36.230');
    } else {
      setUrl('https://encuestas1.herokuapp.com');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nombre de la empresa
          </Typography>
          <Button onClick={handleUrl} color="secondary">
            {url}
          </Button>
          <Link to={'/muestreo'} style={{ textDecoration: 'none' }}>
            <StyledChip
              label="Muestreo"
              sx={{
                backgroundColor: current === 'muestreo' ? '#005cb8' : 'inherit',
              }}
            />
          </Link>
          <Link to={'/posestratificacion'} style={{ textDecoration: 'none' }}>
            <StyledChip
              label="Posestratificación"
              sx={{
                backgroundColor:
                  current === 'posestratificacion' ? '#005cb8' : 'inherit',
              }}
            />
          </Link>
          <Link to={'/visualizacion'} style={{ textDecoration: 'none' }}>
            <StyledChip
              label="Visualización"
              sx={{
                backgroundColor:
                  current === 'visualizacion' ? '#005cb8' : 'inherit',
              }}
            />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
