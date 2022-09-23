import { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import axios from 'axios';
import { uploadFile } from '../../firebase/config';
import ReactLoading from 'react-loading';
import {
  faFileWord,
  faFileCsv,
  faFilePowerpoint,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Files = ({ setDone }) => {
  const [files, setFiles] = useState(null);
  const [template, setTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wordFile, setWordFile] = useState(false);
  const [csvFile, setCsvFile] = useState(false);
  const [pptFile, setPptFile] = useState(false);

  const subirArchivo = e => {
    let result = null;

    if (e.target.files.length > 2) {
      alert('Más de dos archivos seleccionados, intente nuevamente');
    } else {
      for (let index = 0; index < e.target.files.length; index++) {
        if (
          e.target.files.length === 2 ||
          files === null ||
          files.length === 2
        ) {
          result = e.target.files;
          setFiles(e.target.files);
        } else {
          const file1 = { 0: files[0] };
          const file2 = { 1: e.target.files[0] };
          const len = { length: 2 };
          result = Object.assign(file1, file2, len);
          setFiles(result);
        }
      }
    }
  };

  const subirPlantilla = e => {
    setTemplate(e.target.files[0]);
    setPptFile(true);
  };

  useEffect(() => {
    if (files != null) {
      setWordFile(false);
      setCsvFile(false);
      for (let index = 0; index < files.length; index++) {
        if (
          files[index].type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          files[index].type === 'text/plain'
        ) {
          setWordFile(true);
        } else {
          setCsvFile(true);
        }
      }
    }
  }, [files]);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);

    let urlWord,
      urlExcel,
      urlPower = null;

    for (let index = 0; index < files.length; index++) {
      if (
        files[index].type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        files[index].type === 'text/plain'
      ) {
        urlWord = await uploadFile(files[index], files[index].name);
      } else {
        urlExcel = await uploadFile(files[index], files[index].name);
      }
    }

    if (template !== null) {
      urlPower = await uploadFile(template, template.name);
    }

    setIsLoading(false);
    setDone(true);

    const filesName = {
      word: urlWord,
      excel: urlExcel,
      powerPoint: urlPower,
    };

    const urlFiles = 'https://encuestas1.herokuapp.com/files';
    // const urlFiles = "https://backend-encuestas-api.herokuapp.com/files";
    // const urlFiles = "http://localhost:4000/files";
    axios
      .post(urlFiles, filesName)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.warn(err));
  };

  return (
    <main className="Files">
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
            accept=".doc,.docx,.txt,.csv,.xlsx,.xlsm,.xlsb,.xltx,.Rda"
          />
          {files !== null ? (
            <div className="document">
              {wordFile ? <FontAwesomeIcon icon={faFileWord} /> : ''}
              {csvFile ? <FontAwesomeIcon icon={faFileCsv} /> : ''}
            </div>
          ) : (
            <span className="hide-done" />
          )}
        </form>
        <form className="Upload-files">
          <label htmlFor="uploadTemplate" className="Button">
            Subir plantilla
          </label>
          <input
            type="file"
            id="uploadTemplate"
            name="uploadTemplate"
            onChange={subirPlantilla}
            accept=".pptx,.pptm,.ppt,.potx,.potm,.pot,.ppsx,.ppsm"
          />
          {template !== null ? (
            <div className="document">
              {pptFile ? <FontAwesomeIcon icon={faFilePowerpoint} /> : ''}
            </div>
          ) : (
            <span className="hide-done" />
          )}
        </form>
        {!isLoading ? (
          wordFile && csvFile ? (
            <form className="Upload-files">
              <div className="Button" onClick={handleSubmit}>
                Aceptar
              </div>
              <span className="hide-done" />
            </form>
          ) : (
            ''
          )
        ) : (
          <form className="Upload-files">
            <ReactLoading
              type={'spinningBubbles'}
              color={'#000000'}
              height={50}
              width={50}
            />
            <span className="hide-done" />
          </form>
        )}
      </section>
    </main>
  );
};

export default Files;
