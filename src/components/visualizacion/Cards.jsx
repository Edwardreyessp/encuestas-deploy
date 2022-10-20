import Answer from './Answer';
import {
  Typography,
  Box,
  Stack,
  TextField,
  Divider,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import StackedBarChartRoundedIcon from '@mui/icons-material/StackedBarChartRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { useState } from 'react';

/**
 * Muestra cada pregunta
 * @component
 * @param {object} data - Datos a enviar
 * @param {function} setData - Setter de los datos
 * @param {number} id - ID de la pregunta
 * @param {string[]} graphics - Gráficos seleccionados
 * @param {function} setGraphics - Setter de gráficos
 * @param {function} setShowDownload - Setter estado del botón download
 */
const Card = ({
  data,
  setData,
  question,
  id,
  graphics,
  setGraphics,
  setShowDownload,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(question.enunciado);
  const [charts, setCharts] = useState([]);

  // Banderas de charts
  const [vchart, setVchart] = useState(false); // vertical
  const [vochart, setVOchart] = useState(false); // vertical ordered
  const [hchart, setHchart] = useState(false); // horizontal
  const [hochart, setHOchart] = useState(false); // horizontal ordered
  const [schart, setSchart] = useState(false); // stack

  /**
   * Guarda la pregunta
   * @function
   */
  const handleSaveQuestion = () => {
    let newData = data;
    Object.values(newData)[id].enunciado = editedText;
    setData(newData);
    setIsEditing(!isEditing);
    setShowDownload(false);
  };

  /**
   * Guarda los gráficos
   * @function
   * @param {string} chartName - Nombre de el gráfico seleccionado
   */
  const handleChart = chartName => {
    let newCharts = charts;
    if (newCharts.includes(chartName)) {
      newCharts = charts.filter(item => item !== chartName);
    } else {
      newCharts.push(chartName);
    }
    setCharts(newCharts);
    setGraphics({ ...graphics, [id + 1]: newCharts });

    switch (chartName) {
      case 'barras':
        setVchart(!vchart);
        break;
      case 'barrasO':
        setVOchart(!vochart);
        break;
      case 'barrasH':
        setHchart(!hchart);
        break;
      case 'barrasHO':
        setHOchart(!hochart);
        break;
      case 'pila':
        setSchart(!schart);
        break;

      default:
        break;
    }
  };

  /**
   * Muestra los íconos
   * @function
   * @param {string} tipo - tipo de pregunta
   */
  const showIcons = tipo => {
    const disabled = tipo === 'bq' || tipo === 'moq';
    return (
      <Box display={'flex'} gap={1}>
        <Divider orientation="vertical" flexItem />
        <Tooltip title={!disabled ? '' : 'Barras vertical'}>
          <span>
            <IconButton
              onClick={() => handleChart('barras')}
              sx={{ color: vchart ? '#ab47bc' : 'white' }}
              disabled={!disabled}
            >
              <BarChartRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={!disabled ? '' : 'Barras vertical ordenado'}>
          <span>
            <IconButton
              onClick={() => handleChart('barrasO')}
              sx={{ color: vochart ? '#ab47bc' : 'white' }}
              disabled={!disabled}
            >
              <SignalCellularAltRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={!disabled ? '' : 'Barras horizontal'}>
          <span>
            <IconButton
              onClick={() => handleChart('barrasH')}
              sx={{ color: hchart ? '#ab47bc' : 'white' }}
              disabled={!disabled}
            >
              <BarChartRoundedIcon sx={{ transform: 'rotate(90deg)' }} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={!disabled ? '' : 'Barras horizontal ordenado'}>
          <span>
            <IconButton
              onClick={() => handleChart('barrasHO')}
              sx={{ color: hochart ? '#ab47bc' : 'white' }}
              disabled={!disabled}
            >
              <SignalCellularAltRoundedIcon
                sx={{ transform: 'rotate(90deg)' }}
              />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={disabled ? '' : 'Pila'}>
          <span>
            <IconButton
              onClick={() => handleChart('pila')}
              sx={{ color: schart ? '#ab47bc' : 'white' }}
              disabled={disabled}
            >
              <StackedBarChartRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <IconButton onClick={() => setIsEditing(!isEditing)}>
          <EditRoundedIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
    );
  };

  /**
   * Muestra el tipo de pregunta
   * @function
   * @param {string} tipo - tipo de pregunta
   * @returns Nombre desglosado del tipo de pregunta
   */
  const showQuestionType = tipo => {
    switch (tipo) {
      case 'bq':
        return 'Basic question';
      case 'cq':
        return 'Category question';
      case 'moq':
        return 'Multi option question';
      default:
        break;
    }
  };

  if (isEditing) {
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={'37px 24px'}
        borderRadius={'4px'}
        bgcolor={'#29b6f6'}
        height={'57px'}
        gap={2}
        mb={5}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={editedText}
          fullWidth
          onChange={e => setEditedText(e.target.value)}
        />
        <SaveRoundedIcon
          sx={{ color: 'white', cursor: 'pointer' }}
          onClick={handleSaveQuestion}
        />
      </Box>
    );
  }

  return (
    <Box mb={5} minWidth={'75vw'}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={'37px 24px'}
        borderRadius={'4px 4px 0px 4px'}
        bgcolor={'#29b6f6'}
        paddingY={0.5}
        gap={2}
        boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
      >
        {/* Pregunta */}
        <Box
          width={'100%'}
          minHeight={'75px'}
          onClick={() => setIsActive(!isActive)}
          sx={{ cursor: 'pointer' }}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Typography color={'white'} fontSize={20}>
            {question.enunciado}
          </Typography>
          <Typography color={'white'} fontSize={10}>
            {showQuestionType(question.tipo_pregunta)}
          </Typography>
        </Box>
        {showIcons(question.tipo_pregunta) /* Íconos */}
      </Box>
      {/* Respuestas */}
      <Box
        ml={'50px'}
        paddingX={'15px'}
        bgcolor={'#ffffff'}
        borderRadius={'0px 0px 4px 4px'}
        boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
      >
        <Collapse in={isActive}>
          <Stack spacing={1.5} paddingY={1.5}>
            {Object.values(question.respuestas).map((answer, index) => {
              return (
                <Stack key={index} spacing={1}>
                  <Answer
                    answer={answer}
                    data={data}
                    setData={setData}
                    idQuestion={id}
                    id={index}
                    setShowDownload={setShowDownload}
                  />
                  {index + 1 !== Object.keys(question.respuestas).length ? (
                    <Divider flexItem />
                  ) : (
                    ''
                  )}
                </Stack>
              );
            })}
          </Stack>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Card;
