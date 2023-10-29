import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

const ConfigCharts = ({
  data,
  setData,
  charts,
  download,
  handleCreateCharts,
  loadingCharts,
}) => {
  const fonts = ['Arial', 'Century Gothic', 'Times New Roman'];
  const text = [
    { key: 'sizeBarText', value: 'Barra' },
    { key: 'sizeChartText', value: 'Dentro de la gráfica' },
    { key: 'sizeAxisText', value: 'Ejes' },
    { key: 'sizeLegendText', value: 'Leyenda' },
  ];
  const colores = [
    { key: 'colorText', value: 'Texto' },
    { key: 'colorPrimary', value: 'Primario' },
    { key: 'colorSecondary', value: 'Secundario' },
    { key: 'colorTerceary', value: 'Terciario' },
  ];

  return (
    <Stack spacing={4} sx={{ position: 'fixed', width: '250px' }}>
      <SendInfo
        data={data}
        charts={charts}
        download={download}
        handleCreateCharts={handleCreateCharts}
        loading={loadingCharts}
      />
      <Paper elevation={3} sx={{ p: '10%' }}>
        <Stack spacing={2}>
          <Autocomplete
            size="small"
            blurOnSelect
            options={fonts}
            renderOption={(props, option) => (
              <li key={option} {...props}>
                <Typography style={{ fontFamily: option }}>{option}</Typography>
              </li>
            )}
            value={data.config.font}
            onChange={(_event, newValue) => {
              setData({ ...data, config: { ...data.config, font: newValue } });
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Fuente"
                inputProps={{
                  ...params.inputProps,
                  style: { fontFamily: data.config.font },
                }}
              />
            )}
          />
          <Typography variant="h6" textAlign="center">
            Tamaños de texto
          </Typography>
          {text.map((item, index) => {
            return (
              <TextConfig
                key={index}
                item={item}
                data={data}
                setData={setData}
              />
            );
          })}
          <Typography variant="h6" textAlign="center">
            Colores
          </Typography>
          {colores.map((item, index) => {
            return (
              <ColorConfig
                key={index}
                item={item}
                data={data}
                setData={setData}
              />
            );
          })}
        </Stack>
      </Paper>
    </Stack>
  );
};

const SendInfo = ({ download, handleCreateCharts, loading }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (loading) {
    return <CircularProgress />;
  }

  if (download) {
    return (
      <Button
        variant="contained"
        color="success"
        href={download}
        rel="noopener noreferrer"
        target={'_blank'}
        startIcon={<SaveRoundedIcon />}
      >
        Descargar gráficas
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={event => setAnchorEl(event.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Crear gráficas
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => handleCreateCharts('L1')}>Layout 1</MenuItem>
        <MenuItem onClick={() => handleCreateCharts('L2')}>Layout 2</MenuItem>
      </Menu>
    </>
  );
};

const ColorConfig = ({ item, data, setData }) => {
  const [color, setColor] = useState(data.config[`${item.key}`]);
  const [colorText, setColorText] = useState('#ffffff');
  const [open, setOpen] = useState(false);

  const handleSaveColor = () => {
    setData({
      ...data,
      config: {
        ...data.config,
        [item.key]: color,
      },
    });
    setOpen(false);
    contrastColor(color);
  };

  const handleClose = () => {
    setColor(data.config[`${item.key}`]);
    setColorText(contrastColor(data.config[`${item.key}`]));
    setOpen(false);
  };

  const contrastColor = color => {
    let hex = color;
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    const r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);

    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#ffffff';
  };

  const handleColor = color => {
    setColor(color);
    setColorText(contrastColor(color));
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ bgcolor: color, color: colorText }}
      >
        {item.value}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <ChromePicker
            onChange={color => handleColor(color.hex)}
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
    </>
  );
};

const TextConfig = ({ item, data, setData }) => {
  const handleChange = e => {
    setData({
      ...data,
      config: {
        ...data.config,
        [item.key]: e.target.value,
      },
    });
  };

  return (
    <TextField
      label={item.value}
      value={data.config[`${item.key}`]}
      onChange={e => handleChange(e)}
      size="small"
      variant="outlined"
      type="number"
      InputProps={{ inputProps: { min: 0, max: 50 } }}
    />
  );
};

const CircularProgressLabel = ({ value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ConfigCharts;
