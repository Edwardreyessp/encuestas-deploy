import Card from './Cards';
import { axiosPost, getQuestions } from '../../services/Index';
// import SendRoundedIcon from '@mui/icons-material/SendRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
  Box,
  Stack,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
  Paper,
  Typography,
  MenuItem,
  Menu,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';

/**
 * Muestra todo el componente de preguntas
 * @function
 */
const Questions = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [graphics, setGraphics] = useState({});
  const [download, setDownload] = useState('');
  const [showDownload, setShowDownload] = useState(false);
  const [configuration, setConfiguration] = useState({
    colorText: '#000000',
    colorPrimary: '#000000',
    colorSecondary: '#000000',
    colorTerceary: '#000000',
    font: 'Arial',
    sizeBarText: '9',
    sizeChartText: '9',
    sizeAxisText: '9',
    sizeLegendText: '9',
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Revisa si se editó la información
   * @hook
   */
  useEffect(() => {
    setShowDownload(false);
  }, [graphics]);

  /**
   * Recibe datos http
   * @hook
   */
  useEffect(() => {
    async function loadData() {
      const response = await getQuestions();

      if (response.status === 200) {
        setData(response.data);
        setIsLoading(false);
      }
    }
    loadData();
  }, [isLoading]);

  /**
   * Sube los datos editados
   * @function
   */
  const handleCreateCharts = async layout => {
    setAnchorEl(null);
    setIsSending(true);
    const allData = {
      preguntas: data,
      charts: graphics,
      config: configuration,
      layout: layout,
    };

    const response = await axiosPost(allData, 'getURL');
    if (response.status === 200) {
      setDownload(response.data);
      setIsSending(false);
      setShowDownload(true);
    }
  };

  if (isLoading) {
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100vw'}
        gap={2}
      >
        <CircularProgress />
        <div>Cargando...</div>
      </Box>
    );
  } else {
    return (
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        gap={5}
        paddingX={'34px'}
      >
        <Stack position={'absolute'} left={'34px'}>
          {Object.values(data).map((question, index) => {
            return (
              <Card
                key={index}
                data={data}
                setData={setData}
                question={question}
                id={index}
                graphics={graphics}
                setGraphics={setGraphics}
                setShowDownload={setShowDownload}
              />
            );
          })}
        </Stack>
        <Box
          width={'300px'}
          position="fixed"
          right={'34px'}
          display="flex"
          alignItems={'center'}
          flexDirection="column"
        >
          {showDownload ? (
            <Button
              variant="contained"
              color="success"
              href={download}
              rel="noopener noreferrer"
              target={'_blank'}
              startIcon={<SaveRoundedIcon />}
            >
              Descargar gráficas
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={
                  isSending ? (
                    <CircularProgress sx={{ color: 'white' }} size={20} />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Crear gráficas
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleCreateCharts('L1')}>
                  Layout 1
                </MenuItem>
                <MenuItem onClick={() => handleCreateCharts('L2')}>
                  Layout 2
                </MenuItem>
              </Menu>
            </>
          )}
          <Config
            configuration={configuration}
            setConfiguration={setConfiguration}
            setShowDownload={setShowDownload}
          />
        </Box>
      </Box>
    );
  }
};

/**
 * Obtiene la configuración de Visualización
 * @component
 * @param {object} configuration - Configuración de fuente, tamaño y color
 * @param {function} setConfiguration - Setter de configuración
 */
const Config = ({ configuration, setConfiguration, setShowDownload }) => {
  const fonts = ['Arial', 'Century Gothic', 'Times New Roman'];

  return (
    <Paper elevation={2} sx={{ padding: '20px', mt: '36px' }}>
      <Stack spacing={2} width={'225px'}>
        <Autocomplete
          size="small"
          blurOnSelect
          options={fonts}
          renderOption={(props, option) => (
            <li key={option} {...props}>
              <Typography style={{ fontFamily: option }}>{option}</Typography>
            </li>
          )}
          value={configuration.font}
          onChange={(event, newValue) => {
            setShowDownload(false);
            setConfiguration({ ...configuration, font: newValue });
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Fuente"
              inputProps={{
                ...params.inputProps,
                style: { fontFamily: configuration.font },
              }}
            />
          )}
        />
        {/* Tamaño de textos */}
        <NumberField
          setShowDownload={setShowDownload}
          setConfiguration={setConfiguration}
          configuration={configuration}
          label={'Tamaño de texto en la barra'}
          type={'sizeBarText'}
        />
        <NumberField
          setShowDownload={setShowDownload}
          setConfiguration={setConfiguration}
          configuration={configuration}
          label={'Tamaño de texto dentro de la gráfica'}
          type={'sizeChartText'}
        />
        <NumberField
          setShowDownload={setShowDownload}
          setConfiguration={setConfiguration}
          configuration={configuration}
          label={'Tamaño de texto del eje'}
          type={'sizeAxisText'}
        />
        <NumberField
          setShowDownload={setShowDownload}
          setConfiguration={setConfiguration}
          configuration={configuration}
          label={'Tamaño de texto de leyendas'}
          type={'sizeLegendText'}
        />
        {/* Help */}
        <ColorField
          configuration={configuration}
          setConfiguration={setConfiguration}
          setShowDownload={setShowDownload}
          labelColor={'colorText'}
          label={'Color de texto'}
        />
        <ColorField
          configuration={configuration}
          setConfiguration={setConfiguration}
          setShowDownload={setShowDownload}
          labelColor={'colorPrimary'}
          label={'Color primario'}
        />
        <ColorField
          configuration={configuration}
          setConfiguration={setConfiguration}
          setShowDownload={setShowDownload}
          labelColor={'colorSecondary'}
          label={'Color secundario'}
        />
        <ColorField
          configuration={configuration}
          setConfiguration={setConfiguration}
          setShowDownload={setShowDownload}
          labelColor={'colorTerceary'}
          label={'Color terciario'}
        />
      </Stack>
    </Paper>
  );
};

/**
 * Obtiene el número de la configuración
 * @component
 * @param {object} configuration - Configuración de fuente, tamaño y color
 * @param {function} setConfiguration - Setter de configuración
 * @param {function} setShowDownload - Setter de mostrar descarga
 * @param {string} label - Label del campo
 * @param {string} type - Tipo de campo
 * @returns {JSX.Element} - Componente de campo de texto numérico
 */
const NumberField = ({
  setShowDownload,
  setConfiguration,
  configuration,
  label,
  type,
}) => {
  return (
    <TextField
      fullWidth
      type={'number'}
      size="small"
      label={label}
      InputProps={{ inputProps: { min: 0, max: 50 } }}
      value={configuration[type]}
      onChange={value => {
        setShowDownload(false);
        setConfiguration({ ...configuration, [type]: value.target.value });
      }}
    />
  );
};

/**
 * Obtiene el color de la configuración
 * @component
 * @param {object} configuration - Configuración de fuente, tamaño y color
 * @param {function} setConfiguration - Setter de configuración
 * @param {function} setShowDownload - Setter de mostrar descarga
 * @param {string} labelColor - Label del color
 * @param {string} label - Label del color
 * @returns {JSX.Element} - Componente de color
 */
const ColorField = ({
  configuration,
  setConfiguration,
  setShowDownload,
  labelColor,
  label,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(configuration[labelColor]);

  /**
   * Guarda el color seleccionado
   * @function
   */
  const handleSaveColor = () => {
    setShowDownload(false);
    setConfiguration({ ...configuration, [labelColor]: color });
    setShowColorPicker(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ bgcolor: color }}
        onClick={() => setShowColorPicker(true)}
      >
        {label}
      </Button>
      {showColorPicker ? (
        <Box onMouseLeave={handleSaveColor}>
          <ChromePicker onChange={color => setColor(color.hex)} color={color} />
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default Questions;
