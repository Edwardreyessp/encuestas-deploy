import { Box, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { getQuestions } from '../../services/Index';
import Header from './Header';
import ConfigCharts from './ConfigCharts';
import { useUrl } from '../context/BaseUrl';

const Visual = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(-10);
  const { url } = useUrl();

  useEffect(() => {
    setProgress(-10);
  }, [data]);

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
