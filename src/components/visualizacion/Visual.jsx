import { Box, Grid, Stack } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { axiosPost, getQuestions } from '../../services/Index';
import Header from './Header';
import ConfigCharts from './ConfigCharts';
import { useUrl } from '../context/BaseUrl';

const Visual = () => {
  const displayedData = useRef({});
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [download, setDownload] = useState(null);
  const { url } = useUrl();
  let payload = useRef({ charts: {} });
  const [loadingCharts, setloadingCharts] = useState(false);

  async function handleCreateCharts(layout) {
    setloadingCharts(true);
    const loteSize = 50;
    const keys = Object.keys(payload.current.charts);
    const chartsArr = buildData(keys, Object.values(payload.current.charts));
    const chartsPayloadArr = createChartBatches(chartsArr, loteSize);
    const payloadBatches = createPayloadBatches(chartsPayloadArr, data);

    function createChartBatches(data, size) {
      let payloadArr = [];
      let chartCounter = 0;
      let payload = {};

      for (let i = 0; i < data.length; i++) {
        if (chartCounter + data[i].chartLength <= size) {
          payload[data[i].key] = data[i].value;
          chartCounter += data[i].chartLength;
          if (i === data.length - 1) payloadArr.push(payload);
        } else {
          payloadArr.push(payload);
          payload = {};
          chartCounter = 0;
          i--;
        }
      }
      return payloadArr;
    }

    // Crear array de lotes de 10 graficas
    function buildData(keys, values) {
      const data = [];
      for (let i = 0; i < keys.length; i++) {
        data.push({
          key: keys[i],
          value: values[i],
          chartLength: values[i].length,
        });
      }
      return data;
    }

    function createPayloadBatches(batches, data) {
      const payloadBatches = [];
      for (let i = 0; i < batches.length; i++) {
        const payload = {
          ...data,
          charts: batches[i],
          layout: layout,
          final: i < batches.length - 1 ? 'false' : 'true',
        };
        payloadBatches.push(payload);
      }
      return payloadBatches;
    }

    Promise.all(
      payloadBatches.map(payload => axiosPost(payload, `${url}/questions`))
    ).then(responses => {
      setDownload(responses[responses.length - 1].data);
      setloadingCharts(false);
    });
  }

  function handlePayload(value, item) {
    if (!payload.current.charts[`${item.id}`]) {
      payload.current = {
        ...payload.current,
        charts: { ...payload.current.charts, [item.id]: [value] },
      };
    } else if (payload.current.charts[`${item.id}`].includes(value)) {
      payload.current = {
        ...payload.current,
        charts: {
          ...payload.current.charts,
          [item.id]: payload.current.charts[item.id].filter(
            chart => chart !== value
          ),
        },
      };
    } else {
      payload.current = {
        ...payload.current,
        charts: {
          ...payload.current.charts,
          [item.id]: [...payload.current.charts[item.id], value],
        },
      };
    }
    // setCharts(payload.current.charts);
    console.log(payload.current);
  }

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
        displayedData.current = {
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
        };
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
        <Box>Respuesta esperada: Depende del tipo de pregunta</Box>
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
    <Grid container spacing={2} px={2}>
      <Grid item xs={9}>
        <Stack spacing={2}>
          {Object.values(data.preguntas)
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((item, index) => {
              return (
                <Header
                  key={index}
                  item={item}
                  data={data}
                  setData={setData}
                  handlePayload={handlePayload}
                />
              );
            })}
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <ConfigCharts
          data={data}
          setData={setData}
          charts={payload.current.charts}
          download={download}
          handleCreateCharts={handleCreateCharts}
          loadingCharts={loadingCharts}
        />
      </Grid>
    </Grid>
  );
};

export default Visual;
