// import axios from "axios";
import { useState } from 'react';
import logo from '../../images/logo.png';
import {
  faFileCircleCheck,
  faFileCircleExclamation,
  faCircleExclamation,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

const formatos = '.xlsx,.Rda';
// const url = "";

const Files = ({ setDone }) => {
  const [files, setFiles] = useState(null);
  const [encuesta, setEncuesta] = useState(false);
  const [nominal, setNominal] = useState(false);
  const [muestra, setMuestra] = useState(false);

  const subirArchivo = e => {
    setFiles(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].name.includes('encuesta')) setEncuesta(true);
      if (e.target.files[i].name.includes('nominal')) setNominal(true);
      if (e.target.files[i].name.includes('muestra')) setMuestra(true);
    }
  };

  const handleSubmit = async event => {
    let encuesta, nominal, muestra;
    for (let i = 0; i < 3; i++) {
      const fileName = files[i].name;
      if (fileName.includes('encuesta') || fileName.includes('Encuesta')) {
        encuesta = fileName;
      } else if (fileName.includes('nominal') || fileName.includes('Nominal')) {
        nominal = fileName;
      } else if (fileName.includes('muestra') || fileName.includes('Muestra')) {
        muestra = fileName;
      }
    }
    const filesNames = {
      encuesta: encuesta,
      nominal: nominal,
      muestra: muestra,
    };
    console.log(filesNames);
    setDone(true);
    // axios.post(url, filesNames).catch((err) => console.warn(err));
  };

  return (
    <main className="FilesPos">
      <img src={logo} alt="Logo de la empresa" />
      <section className="Upload-buttons">
        <form className="Upload-files">
          <label htmlFor="uploadFile" className="Button">
            Subir archivos
          </label>
          <input
            type="file"
            id="uploadFile"
            name="uploadFile"
            multiple
            onChange={subirArchivo}
            accept={formatos}
          />
          {files === null || files.length !== 3 ? (
            <FontAwesomeIcon
              className="icon"
              data-tip
              icon={faFileCircleExclamation}
            />
          ) : (
            <FontAwesomeIcon className="icon" icon={faFileCircleCheck} />
          )}
          <ReactTooltip
            className="Tip"
            place="top"
            type="dark"
            effect="solid"
            multiline={true}
          >
            <div>
              <p>Encuesta</p>
              {encuesta ? (
                <FontAwesomeIcon className="iconCheck" icon={faCircleCheck} />
              ) : (
                <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
              )}
            </div>
            <div>
              <p>Nominal</p>
              {nominal ? (
                <FontAwesomeIcon className="iconCheck" icon={faCircleCheck} />
              ) : (
                <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
              )}
            </div>
            <div>
              <p>Muestra</p>
              {muestra ? (
                <FontAwesomeIcon className="iconCheck" icon={faCircleCheck} />
              ) : (
                <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
              )}
            </div>
          </ReactTooltip>
        </form>
        <form className="Upload-files">
          <div className="Button" onClick={handleSubmit}>
            Aceptar
          </div>
          <nav className="sizedBox"></nav>
        </form>
      </section>
    </main>
  );
};

export default Files;
