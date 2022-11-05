import Card from './Cards';
import { getQuestions, sendCharts } from '../../services/Index';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
  Box,
  Stack,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
  Paper,
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
  const handleCreateCharts = async () => {
    setIsSending(true);
    const response = await sendCharts(graphics);
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
            <Button
              variant="contained"
              endIcon={
                isSending ? (
                  <CircularProgress sx={{ color: 'white' }} size={20} />
                ) : (
                  <SendRoundedIcon />
                )
              }
              onClick={handleCreateCharts}
            >
              Crear gráficas
            </Button>
          )}
          <Config setData={setData} />
        </Box>
      </Box>
    );
  }
};

const Config = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('#0288d1');
  const fonts = ['Arial', 'Sans', 'Cómic'];

  const handleSaveColor = () => {
    setShowColorPicker(false);
  };

  return (
    <Paper elevation={2} sx={{ padding: '20px', mt: '36px' }}>
      <Stack spacing={2} width={'225px'}>
        <Autocomplete
          size="small"
          blurOnSelect
          options={fonts}
          onChange={(event, newValue) => console.log(newValue)}
          renderInput={params => <TextField {...params} label="Fonts" />}
        />
        <Autocomplete
          size="small"
          blurOnSelect
          options={fonts}
          onChange={(event, newValue) => console.log(newValue)}
          renderInput={params => <TextField {...params} label="Tamaño" />}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: color }}
          onClick={() => setShowColorPicker(true)}
        >
          Color
        </Button>
        {showColorPicker ? (
          <Box onMouseLeave={handleSaveColor}>
            <ChromePicker
              onChange={color => setColor(color.hex)}
              color={color}
            />
          </Box>
        ) : (
          ''
        )}
      </Stack>
    </Paper>
  );
};

export default Questions;
