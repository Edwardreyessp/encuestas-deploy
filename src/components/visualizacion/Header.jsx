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

const Header = ({ item, data, setData, handlePayload }) => {
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
    handlePayload(value, item);
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
          [item.id]: {
            ...prev.preguntas[item.id],
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

  const getNewId = () => {
    let newId = item.id.split('Q')[0];
    let num = 0;
    Object.keys(data.preguntas).forEach(id => {
      if (id.includes(newId)) {
        if (isNaN(id.split('_')[3])) num = 1;
        else num = parseInt(id.split('_')[3]) + 1;
      }
    });

    return `${item.id.split('_')[0]}_${item.id.split('_')[1]}_${
      item.id.split('_')[2]
    }_${num}`;
  };

  const handleCreateCopy = () => {
    let newId = getNewId();
    setData(prev => {
      return {
        ...prev,
        preguntas: {
          ...prev.preguntas,
          [newId]: {
            ...prev.preguntas[item.id],
            id: newId,
          },
        },
      };
    });
  };

  const getVisualId = () => {
    if (item.id.split('_')[3])
      return `${item.id.split('Q')[0]}_${item.id.split('_')[3]}`;
    return item.id.split('Q')[0];
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
          <Typography>{getVisualId()}</Typography>
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
                  color={charts[icon] ? 'primary' : 'inherit'}
                  tooltip={getTooltip(icon)}
                  disabled={isDisabled(icon, item.tipo_pregunta)}
                />
              </Box>
            );
          })}
          <Divider orientation="vertical" flexItem />
          <StyledIcon icon="edit" onClick={() => setIsEditing(true)} />
          <Divider orientation="vertical" flexItem />
          <StyledIcon
            icon="add"
            onClick={handleCreateCopy}
            tooltip="Crear copia"
          />
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
                  id_pregunta={item.id}
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
                      id_pregunta={item.id}
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
