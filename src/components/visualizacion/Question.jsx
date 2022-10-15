import Card from './Cards';
import { getQuestions, sendCharts } from '../../services/Index';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Box, Stack, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

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
        <Stack>
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
        <Stack width={'300px'} spacing={2}>
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
        </Stack>
      </Box>
    );
  }
};

export default Questions;
