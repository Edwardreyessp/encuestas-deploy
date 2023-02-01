import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Divider, TextField, IconButton, Typography, Box } from '@mui/material';
import { ChromePicker } from 'react-color';
import { useState } from 'react';

/**
 * Componente de respuesta
 * @component
 * @param {object} answer - Respuesta y color
 * @param {object} data - Datos a enviar
 * @param {function} setData - Setter de los datos
 * @param {number} idQuestion - ID de pregunta
 * @param {number} id - ID de la respuesta
 * @param {function} setShowDownload - Setter estado del botón download
 */
const Answer = ({ answer, data, setData, idQuestion, id, setShowDownload }) => {
  const [color, setColor] = useState(answer.color);
  const [showPickerColor, setShowPickerColor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(answer.respuesta);
  const [order, setOrder] = useState('0');

  /**
   * Guarda la respuesta editada
   * @function
   */
  const handleSaveAnswer = () => {
    let newData = data;
    Object.values(Object.values(newData))[idQuestion].respuestas[
      id + 1
    ].respuesta = editedText;
    setData(newData);
    setIsEditing(!isEditing);
    setShowDownload(false);
  };

  /**
   * Guarda el color seleccionado
   * @function
   */
  const handleSaveColor = () => {
    let newData = data;
    Object.values(Object.values(newData))[idQuestion].respuestas[id + 1].color =
      color;
    setData(newData);
    setShowPickerColor(!showPickerColor);
    setShowDownload(false);
  };

  /**
   * Guarda el orden de la respuesta
   * @function
   */
  const saveOrder = () => {
    let newData = data;
    Object.values(Object.values(newData))[idQuestion].respuestas[id + 1].orden =
      order;
    setData(newData);
    setShowDownload(false);
  };

  if (isEditing) {
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={editedText}
          fullWidth
          onChange={e => setEditedText(e.target.value)}
        />
        <IconButton onClick={handleSaveAnswer}>
          <SaveRoundedIcon sx={{ cursor: 'pointer' }} />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      display={'flex'}
      gap={2}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box display={'flex'} gap={2} alignItems={'center'}>
        <Box>
          {showPickerColor ? (
            <Box
              position={'absolute'}
              ml={4}
              mt={4}
              onMouseLeave={handleSaveColor}
            >
              <ChromePicker
                onChange={color => setColor(color.hex)}
                color={color}
              />
            </Box>
          ) : (
            ''
          )}
          <Box
            width={18}
            height={18}
            bgcolor={color}
            boxShadow={'0px 2px 4px rgba(0, 0, 0, 0.25)'}
            sx={{ cursor: 'pointer' }}
            onClick={() => setShowPickerColor(!showPickerColor)}
          />
        </Box>
        <Typography>{answer.respuesta}</Typography>
      </Box>
      <Box display={'flex'} gap={2} alignItems={'center'}>
        <TextField
          sx={{ width: 90 }}
          label="Orden"
          size="small"
          type={'number'}
          InputProps={{ inputProps: { min: 0, max: 50 } }}
          value={order}
          onChange={e => setOrder(e.target.value)}
          onBlur={saveOrder}
        />
        <Divider orientation="vertical" flexItem />
        <IconButton onClick={() => setIsEditing(!isEditing)}>
          <EditRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Answer;
