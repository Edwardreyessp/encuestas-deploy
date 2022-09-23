import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck as regular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Encuestas = ({
  opcionesEncuesta,
  setOpcionesEncuesta,
  name,
  flag,
  option,
}) => {
  const Opciones = string => {
    switch (string) {
      case 'nacional':
        const nacional = !opcionesEncuesta.nacional;
        return setOpcionesEncuesta({ ...opcionesEncuesta, nacional });
      case 'circuns':
        const circuns = !opcionesEncuesta.circuns;
        return setOpcionesEncuesta({ ...opcionesEncuesta, circuns });
      case 'estatal':
        const estatal = !opcionesEncuesta.estatal;
        return setOpcionesEncuesta({ ...opcionesEncuesta, estatal });
      case 'municipal':
        const municipal = !opcionesEncuesta.municipal;
        return setOpcionesEncuesta({ ...opcionesEncuesta, municipal });
      case 'local':
        const local = !opcionesEncuesta.local;
        return setOpcionesEncuesta({ ...opcionesEncuesta, local });
      case 'federal':
        const federal = !opcionesEncuesta.federal;
        return setOpcionesEncuesta({ ...opcionesEncuesta, federal });
      case 'seccion':
        const seccion = !opcionesEncuesta.seccion;
        return setOpcionesEncuesta({ ...opcionesEncuesta, seccion });
      default:
        break;
    }
  };

  return (
    <div className="individual-option">
      <p>{name}</p>
      <div className="Icon" onClick={() => Opciones(option)}>
        {flag === true ? (
          <FontAwesomeIcon icon={faSquareCheck} />
        ) : (
          <FontAwesomeIcon icon={regular} />
        )}
      </div>
    </div>
  );
};

export default Encuestas;
