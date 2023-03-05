import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import StackedBarChartRoundedIcon from '@mui/icons-material/StackedBarChartRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';

const StyledIcon = ({ icon, onClick, color, tooltip, disabled }) => {
  const getIcon = () => {
    if (icon === 'barras') return <BarChartRoundedIcon color={color} />;
    if (icon === 'barrasO')
      return <SignalCellularAltRoundedIcon color={color} />;
    if (icon === 'barrasH')
      return (
        <BarChartRoundedIcon
          sx={{ transform: 'rotate(90deg)' }}
          color={color}
        />
      );
    if (icon === 'barrasHO')
      return (
        <SignalCellularAltRoundedIcon
          sx={{ transform: 'rotate(90deg)' }}
          color={color}
        />
      );
    if (icon === 'pila') return <StackedBarChartRoundedIcon color={color} />;
    if (icon === 'edit') return <EditRoundedIcon color={color} />;
    if (icon === 'add') return <AddIcon color={color} />;
    if (icon === 'save') return <SaveRoundedIcon color={color} />;
    return <BarChartRoundedIcon />;
  };

  if (!onClick) return getIcon();
  if (disabled)
    return (
      <IconButton onClick={onClick} disabled={disabled}>
        {getIcon()}
      </IconButton>
    );
  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={onClick}>{getIcon()}</IconButton>
    </Tooltip>
  );
};

export default StyledIcon;
