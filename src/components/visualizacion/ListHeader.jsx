import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import StyledIcon from '../Styled/StyledIcon';

const MyAnswers = ({ answer, setData, id, id_pregunta, type }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(answer.color);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(answer.respuesta);
  const [order, setOrder] = useState(answer.orden);
  const [isChecked, setIsChecked] = useState(
    answer.activo === 'true' ? true : false
  );

  useEffect(() => {
    setColor(answer.color);
    setEditedText(answer.respuesta);
  }, [answer]);

  const handleClose = () => {
    setColor(answer.color);
    setOpen(false);
  };

  const handleSaveColor = () => {
    setData(prev => {
      return {
        ...prev,
        preguntas: {
          ...prev.preguntas,
          [id_pregunta]: {
            ...prev.preguntas[id_pregunta],
            respuestas: {
              ...prev.preguntas[id_pregunta].respuestas,
              [id + 1]: {
                ...prev.preguntas[id_pregunta].respuestas[id + 1],
                color: color,
              },
            },
          },
        },
      };
    });
    setOpen(false);
  };

  const handleEditAnswer = () => {
    setData(prev => {
      return {
        ...prev,
        preguntas: {
          ...prev.preguntas,
          [id_pregunta]: {
            ...prev.preguntas[id_pregunta],
            [type]: {
              ...prev.preguntas[id_pregunta][`${type}`],
              [id + 1]: {
                ...prev.preguntas[id_pregunta][`${type}`][id + 1],
                respuesta: editedText,
              },
            },
          },
        },
      };
    });
    setIsEditing(false);
  };

  const handleChecked = () => {
    setData(prev => {
      return {
        ...prev,
        preguntas: {
          ...prev.preguntas,
          [id_pregunta]: {
            ...prev.preguntas[id_pregunta],
            [type]: {
              ...prev.preguntas[id_pregunta][`${type}`],
              [id + 1]: {
                ...prev.preguntas[id_pregunta][`${type}`][id + 1],
                activo: !isChecked ? 'true' : 'false',
              },
            },
          },
        },
      };
    });
    setIsChecked(!isChecked);
  };

  const handleOrder = e => {
    setData(prev => {
      return {
        ...prev,
        preguntas: {
          ...prev.preguntas,
          [id_pregunta]: {
            ...prev.preguntas[id_pregunta],
            [type]: {
              ...prev.preguntas[id_pregunta][`${type}`],
              [id + 1]: {
                ...prev.preguntas[id_pregunta][`${type}`][id + 1],
                orden: e.target.value,
              },
            },
          },
        },
      };
    });
    setOrder(e.target.value);
  };

  if (isEditing) {
    return (
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          variant="outlined"
          size="small"
          value={editedText}
          fullWidth
          onChange={e => setEditedText(e.target.value)}
        />
        <StyledIcon icon="save" onClick={handleEditAnswer} />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          width={18}
          height={18}
          bgcolor={color}
          boxShadow={'0px 2px 4px rgba(0, 0, 0, 0.25)'}
          sx={{ cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <ChromePicker
              onChange={color => setColor(color.hex)}
              color={color}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSaveColor} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <Typography>{answer.respuesta}</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        maxWidth={answer.activo ? '20%' : '15%'}
      >
        <TextField
          label="Orden"
          variant="outlined"
          size="small"
          value={order}
          onChange={e => handleOrder(e)}
          type="number"
          InputProps={{ inputProps: { min: 0, max: 50 } }}
        />
        {answer.activo && (
          <Checkbox checked={isChecked} onChange={handleChecked} />
        )}
        <Divider orientation="vertical" flexItem />
        <StyledIcon icon="edit" onClick={() => setIsEditing(true)} />
      </Box>
    </Box>
  );
};

export default MyAnswers;
