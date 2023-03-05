import { Box, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { getQuestions } from '../../services/Index';
import Header from './Header';
import ConfigCharts from './ConfigCharts';

const Visual = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(-10);

  useEffect(() => {
    setProgress(-10);
  }, [data]);

  useEffect(() => {
    async function loadData() {
      const response = await getQuestions();

      if (response.status === 200) {
        setData({
          preguntas: { ...response.data },
          charts: {},
          config: {
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
  }, [isLoading]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box p="2%" display="flex" justifyContent="space-between" width="100%">
      <Stack spacing={2} maxWidth="80%">
        {Object.values(data.preguntas).map((item, index) => {
          return (
            <Header
              key={index}
              item={item}
              id={index}
              setData={setData}
              id_pregunta={Object.keys(data.preguntas)[index]}
            />
          );
        })}
      </Stack>
      <Box width="18%">
        <ConfigCharts
          data={data}
          setData={setData}
          progress={progress}
          setProgress={setProgress}
        />
      </Box>
    </Box>
  );
};

export default Visual;
