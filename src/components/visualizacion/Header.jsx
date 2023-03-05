import {
  Box,
  Collapse,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import StyledIcon from '../Styled/StyledIcon';
import MyAnswers from './ListHeader';

const Header = ({ item, id, setData, id_pregunta }) => {
  const options = ['barras', 'barrasO', 'barrasH', 'barrasHO', 'pila'];
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.enunciado);
  const [showAnswers, setShowAnswers] = useState(false);
  const [charts, setCharts] = useState({
    vertical: false,
    vordenada: false,
    horizontal: false,
    hordenada: false,
    pila: false,
  });

  const handleCharts = value => {
    setData(prev => {
      if (!prev.charts[`${id + 1}`]) {
        return { ...prev, charts: { ...prev.charts, [id + 1]: [value] } };
      }
      if (prev.charts[`${id + 1}`].includes(value))
        return {
          ...prev,
          charts: {
            ...prev.charts,
            [id + 1]: prev.charts[id + 1].filter(chart => chart !== value),
          },
        };
      return {
        ...prev,
        charts: {
          ...prev.charts,
          [id + 1]: [...prev.charts[id + 1], value],
        },
      };
    });

    setCharts(prev => {
      return {
        ...prev,
        [value]: !prev[value],
      };
    });
  };

  const handleEdit = () => {
    setData(prev => {
      return {
        ...prev,
        preguntas: {
          ...prev.preguntas,
          [id_pregunta]: {
            ...prev.preguntas[id_pregunta],
            enunciado: editedText,
          },
        },
      };
    });
    setIsEditing(false);
  };

  const getTooltip = value => {
    if (value === 'barras') return 'Gráfico de barras vertical';
    if (value === 'barrasO') return 'Gráfico de barras vertical ordenada';
    if (value === 'barrasH') return 'Gráfico de barras horizontal';
    if (value === 'barrasHO') return 'Gráfico de barras horizontal ordenada';
    if (value === 'pila') return 'Gráfico de pila';
  };

  const isDisabled = (icon, tipo) => {
    if (tipo === 'cq') {
      return !(icon === 'pila');
    }
    return icon === 'pila';
  };

  const getCategory = () => {
    if (item.tipo_pregunta === 'bq') return 'Basic Question';
    if (item.tipo_pregunta === 'cq') return 'Category Question';
    if (item.tipo_pregunta === 'moq') return 'Multi Option Question';
  };

  if (isEditing) {
    return (
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1%',
          width: '100%',
          p: '1%',
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          value={editedText}
          fullWidth
          onChange={e => setEditedText(e.target.value)}
        />
        <StyledIcon icon="save" onClick={handleEdit} />
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        gap={2}
        alignItems="center"
        p="1%"
      >
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Typography>{id + 1}</Typography>
          <Stack
            justifyContent="center"
            height="100%"
            sx={{ cursor: 'pointer' }}
            width="100%"
            onClick={() => setShowAnswers(!showAnswers)}
          >
            <Typography>{item.enunciado}</Typography>
            <Typography variant="caption" color="text.secondary">
              {getCategory()}
            </Typography>
          </Stack>
        </Box>
        <Box display="flex" gap={0.5} alignItems="center">
          {options.map((icon, index) => {
            return (
              <Box key={index}>
                <StyledIcon
                  icon={icon}
                  onClick={() => handleCharts(icon)}
                  color={charts[`${icon}`] ? 'primary' : ''}
                  tooltip={getTooltip(icon)}
                  disabled={isDisabled(icon, item.tipo_pregunta)}
                />
              </Box>
            );
          })}
          <Divider orientation="vertical" flexItem />
          <StyledIcon icon="edit" onClick={() => setIsEditing(true)} />
          <Divider orientation="vertical" flexItem />
          <StyledIcon icon="add" onClick={() => {}} tooltip="Crear copia" />
        </Box>
      </Box>
      <Collapse in={showAnswers}>
        <Stack spacing={1} p="2%">
          {item.tipo_pregunta === 'cq' && (
            <>
              <Typography variant="h6">Respuestas</Typography>
              <Divider />
            </>
          )}
          {Object.values(item.respuestas).map((answer, index) => {
            return (
              <Box key={index}>
                {index !== 0 && <Divider />}
                <MyAnswers
                  answer={answer}
                  setData={setData}
                  id={index}
                  id_pregunta={id_pregunta}
                  type="respuestas"
                />
              </Box>
            );
          })}
          {item.tipo_pregunta === 'cq' && (
            <>
              <Divider />
              <Typography variant="h6">Categorías</Typography>
              {Object.values(item.categorias).map((category, index) => {
                return (
                  <Box key={index}>
                    <Divider />
                    <MyAnswers
                      answer={category}
                      setData={setData}
                      id={index}
                      id_pregunta={id_pregunta}
                      type="categorias"
                    />
                  </Box>
                );
              })}
            </>
          )}
        </Stack>
      </Collapse>
    </Paper>
  );
};

export default Header;
