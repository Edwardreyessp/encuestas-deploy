import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck as regular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Estratos = ({ estratos, setEstratos, name, flag, option }) => {
  const Opciones = string => {
    switch (string) {
      case 'circuns':
        const circuns = !estratos.circuns;
        return setEstratos({ ...estratos, circuns });
      case 'estados':
        const estados = !estratos.estados;
        return setEstratos({ ...estratos, estados });
      case 'municipio':
        const municipio = !estratos.municipio;
        return setEstratos({ ...estratos, municipio });
      case 'local':
        const local = !estratos.local;
        return setEstratos({ ...estratos, local });
      case 'federal':
        const federal = !estratos.federal;
        return setEstratos({ ...estratos, federal });
      case 'seccion':
        const seccion = !estratos.seccion;
        return setEstratos({ ...estratos, seccion });
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

export default Estratos;
