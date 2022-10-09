import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';

{
  /* <Estratos
  estratos={estratos} //Donde se guarda el estado actual
  setEstratos={setEstratos} //Setter
  opciones={opciones} //Lista de opciones
  numEstratos={2} //Cantidad de inputs
  nombre={'Estrato'} //Título de la tarjeta
/>; */
}

const Estratos = ({ estratos, setEstratos, opciones, numEstratos, nombre }) => {
  const [currentOptions, setCurrentOptions] = useState(opciones);

  useEffect(() => {
    let newArray = [];
    for (let i = 0; i < numEstratos; i++) {
      newArray.push(i);
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
                allOptions={opciones}
              />
            );
          })
        : ''}
    </Box>
  );
};

const InputEstratos = ({
  opciones,
  setOpciones,
  estratos,
  setEstratos,
  index,
  allOptions,
}) => {
  const [nombre, setNombre] = useState('');
  const [input, setInput] = useState([]);

  const handleInput = e => {
    setInput(e);

    let newOptions = allOptions;
    newOptions = newOptions.filter(item => !e.includes(item));
    setOpciones(newOptions);
  };

  useEffect(() => {
    if (estratos !== null) {
      let newData = estratos;
      newData[index] = { nombre: nombre, input: input };
      setEstratos(newData);
      console.log(newData[0]);
    }
  }, [nombre, input]);

  const handleEstratos = () => {};

  return (
    <>
      <Grid container spacing={2} width={'100%'}>
        <Grid item xs={3.5}>
          <TextField
            size="small"
            variant="outlined"
            label="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
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

export default Estratos;
