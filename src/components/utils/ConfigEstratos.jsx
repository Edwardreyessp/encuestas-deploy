import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

/**
 * Configuración de niveles y estratos
 * @param {string[]} niveles - Niveles a elegir
 * @param {string[]} estratos - Estratos a elegir
 * @param {object} data - Datos obtenidos de los input
 * @param {Function} setData - Setter de los datos
 */
const ConfigEstratos = ({ niveles, estratos, data, setData }) => {
  const [isLimit, setIsLimit] = useState(false);
  const [variables, setVariables] = useState([]);
  const [cantidad, setCantidad] = useState([]);

  /**
   * Define si se ha llegado al límite de variables elegidas
   * @param {string[]} newValue - Variables de estratos elegidas
   */
  const handleLimit = newValue => {
    // Asignar variables
    let newCantidad = cantidad;
    newCantidad = cantidad.filter(item => {
      if (cantidad !== []) {
        if (newValue.includes(item.label)) return true;
        else return false;
      } else return true;
    });
    setVariables(newValue);
    setData({ ...data, variables: newCantidad });

    // Límite
    if (newValue.length === 2) {
      setIsLimit(true);
    } else {
      setIsLimit(false);
    }
  };

  /**
   * Guarda los datos seleccionados a su respectiva variable
   * @param {string} label - Nombre de la variable
   * @param {string} value - Cantidad de la variable elegida
   * @param {number} index - Posición de la variable en el arreglo
   */
  const handleAmount = (label, value, index) => {
    let newCantidad = cantidad;
    newCantidad[index] = { label: label, value: value.target.value };
    setCantidad(newCantidad);
    setData({ ...data, variables: newCantidad });
  };

  return (
    <Box width={500} boxShadow={2} padding={'39px 51px'}>
      <Autocomplete
        disablePortal
        size="small"
        blurOnSelect
        id="combo-box-demo"
        options={niveles}
        onChange={(event, newValue) => setData({ ...data, nivel: newValue })}
        renderInput={params => (
          <TextField {...params} label="Nivel de encuesta" />
        )}
      />
      <Box mb={'30px'} />
      <Autocomplete
        multiple
        size="small"
        id="combo-box-demo"
        filterSelectedOptions
        options={isLimit ? [] : estratos}
        onChange={(event, newValue) => handleLimit(newValue)}
        renderInput={params => (
          <TextField {...params} label="Variables de estratos" />
        )}
      />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        mt={'30px'}
        gap={10}
      >
        {variables.map((label, index) => {
          return (
            <TextField
              key={index}
              fullWidth
              type={'number'}
              size="small"
              label={`Total de ${label}`}
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              onChange={value => handleAmount(label, value, index)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export const isConfigEstratosDone = data => {
  let flag = true;
  if (data.nivel === undefined && data.variables === undefined) flag = false;
  if (data.variables !== undefined) {
    flag = data.variables.length !== 0;
  }

  return flag;
};

export default ConfigEstratos;
