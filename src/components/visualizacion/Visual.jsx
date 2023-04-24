import { Box, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { getQuestions } from '../../services/Index';
import Header from './Header';
import ConfigCharts from './ConfigCharts';
import { useUrl } from '../context/BaseUrl';

const Visual = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { url } = useUrl();

  useEffect(() => {
    async function loadData() {
      const response = await getQuestions(url);

      if (response.status === 200) {
        setData({
          preguntas: { ...response.data },
          charts: {},
          config: {
            font: 'Arial',
            sizeBarText: '9',
            sizeChartText: '9',
            sizeAxisText: '9',
            sizeLegendText: '9',
            colorText: '#000000',
            colorPrimary: '#000000',
            colorSecondary: '#000000',
            colorTerceary: '#000000',
          },
        });
        setIsLoading(false);
      }
    }
    loadData();
  }, [url]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (!Object.values(data.preguntas)[0].enunciado) {
    console.log({ data: data.preguntas });
    return (
      <Stack spacing={2} alignItems="center">
        <Box>No se recibió la respuesta esperada de servidor</Box>
        <Box>Revisar consola para más info</Box>
        <Box>Respuesta esperada: ?Depende del tipo de pregunta</Box>
        <Box>
          <Box>{'{'}</Box>
          <Box>&nbsp;&nbsp;{'  "001Q_3_1": {'}</Box>
          <Box>&nbsp;&nbsp;&nbsp;&nbsp;{'    "id": "001Q_3_1",'}</Box>
          <Box>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {'    "enunciado": "Enunciado de la pregunta 1",'}
          </Box>
          <Box>&nbsp;&nbsp;&nbsp;&nbsp;{'    "tipo": "bq",'}</Box>
          <Box>&nbsp;&nbsp;&nbsp;&nbsp;{'    "respuestas": {'}</Box>
          <Box>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              '      "1": {color: "#000fff, orden: "0", respuesta: "Respuesta 1", activo?: "true},'
            }
          </Box>
          <Box>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              '      "2": {color: "#000fff, orden: "0", respuesta: "Respuesta 2", activo?: "true},'
            }
          </Box>
          <Box>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              '      "3": {color: "#000fff, orden: "0", respuesta: "Respuesta 3", activo?: "true}'
            }
          </Box>
          <Box>&nbsp;&nbsp;&nbsp;&nbsp;{'    },'}</Box>
          <Box>&nbsp;&nbsp;&nbsp;&nbsp;{'    "categorías?": {'}</Box>
          <Box>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              '      "1": {color: "#000fff, orden: "0", respuesta: "Respuesta 1", activo: "true"},'
            }
          </Box>
          <Box>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              '      "2": {color: "#000fff, orden: "0", respuesta: "Respuesta 2", activo: "true"},'
            }
          </Box>
          <Box>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              '      "3": {color: "#000fff, orden: "0", respuesta: "Respuesta 3", activo: "true"}'
            }
          </Box>
          <Box>&nbsp;&nbsp;&nbsp;&nbsp;{'    }'}</Box>
          <Box>&nbsp;&nbsp;{'  }'}</Box>
          <Box>{'}'}</Box>
        </Box>
      </Stack>
    );
  }

  return (
    <Box p="2%" display="flex" justifyContent="space-between" width="100%">
      <Stack spacing={2} maxWidth="80%">
        {Object.values(data.preguntas)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((item, index) => {
            return (
              <Header key={index} item={item} data={data} setData={setData} />
            );
          })}
      </Stack>
      <Box width="18%">
        <ConfigCharts data={data} setData={setData} />
      </Box>
    </Box>
  );
};

export default Visual;
