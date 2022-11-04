import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';

/**
 * Lista de estratos
 * @function
 * @param {number[]} estratos - Opciones seleccionadas
 * @param {Function} setEstratos - Setter de las opciones
 * @param {string[]} opciones - Opciones a elegir
 */
const Estratos = ({ estratos, setEstratos, opciones, numEstratos, nombre }) => {
  const [currentOptions, setCurrentOptions] = useState(opciones);

  /**
   *Convierte en un arreglo para poer mapearlo
   *@hook
   */
  useEffect(() => {
    let newArray = [];
    for (let i = 0; i < numEstratos; i++) {
      newArray.push({ nombre: '', input: [] });
    }
    setEstratos(newArray);
  }, []);

  return (
    <Box boxShadow={2} width={750} padding={3} borderRadius={1}>
      <h4>{nombre}</h4>
      <Box height={10} />
      {estratos !== []
        ? estratos.map((opcion, index) => {
            return (
              <InputEstratos
                key={index}
                opciones={currentOptions}
                setOpciones={setCurrentOptions}
                estratos={estratos}
                setEstratos={setEstratos}
                index={index}
              />
            );
          })
        : ''}
    </Box>
  );
};

/**
 * Función para mostrar los inputs con opciones disponibles
 * @function
 * @param {string[]} opciones - Opciones disponibles
 * @param {Function} setOpciones - Setter de opciones disponibles
 * @param {object[]} estratos - Datos guardados
 * @param {Function} setEstratos - Setter de datos guardados
 * @param {number} index - Número de estrato
 */
const InputEstratos = ({
  opciones,
  setOpciones,
  estratos,
  setEstratos,
  index,
}) => {
  const handleInput = newValue => {
    setOpciones(prev => {
      return prev.filter(item => !newValue.includes(item));
    });

    setEstratos(
      [...estratos].map((object, i) => {
        if (i === index) {
          return {
            ...object,
            input: newValue,
          };
        } else return object;
      })
    );
  };

  const handleName = name => {
    setEstratos(
      [...estratos].map((object, i) => {
        if (i === index) {
          return {
            ...object,
            nombre: name,
          };
        } else return object;
      })
    );
  };

  const handleEstratos = () => {};

  return (
    <>
      <Grid container spacing={2} width={'100%'}>
        <Grid item xs={3.5}>
          <TextField
            size="small"
            variant="outlined"
            label="Nombre"
            value={estratos[index].nombre}
            onChange={e => handleName(e.target.value)}
            onBlur={handleEstratos}
          />
        </Grid>
        <Grid
          item
          xs={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <p>:</p>
        </Grid>
        <Grid item xs>
          <Autocomplete
            multiple
            size="small"
            id="tags-outlined"
            filterSelectedOptions
            options={opciones}
            getOptionLabel={option => option}
            onChange={(event, newValue) => handleInput(newValue)}
            renderInput={params => <TextField {...params} label="Select..." />}
          />
        </Grid>
      </Grid>
      <Box height={10} />
    </>
  );
};

/**
 * @function
 * @param {object[]} estratos - Datos que se han ingresado
 * @returns boolean si todos los caampos están llenos
 */
export const isEstratosDone = estratos => {
  let flag = true;

  estratos.map((option, index) => {
    if (option === index) flag = false;
    else if (option.name === '' || option.input.length === 0) flag = false;
  });

  return flag;
};

export default Estratos;
