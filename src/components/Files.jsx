import { useEffect, useState } from "react";
import logo from "../images/logo.png";
import axios from "axios";
import { uploadFile } from "../firebase/config";
import ReactLoading from "react-loading";
import { faFileWord, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Files = ({ setDone }) => {
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wordFile, setWordFile] = useState(false);
  const [csvFile, setCsvFile] = useState(false);

  const subirArchivo = (e) => {
    let result = null;

    if (e.target.files.length > 2) {
      alert("Más de dos archivos seleccionados, intente nuevamente");
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

  useEffect(() => {
    if (files != null) {
      setWordFile(false);
      setCsvFile(false);
      for (let index = 0; index < files.length; index++) {
        if (
          files[index].type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          setWordFile(true);
        } else {
          setCsvFile(true);
        }
      }
    }
  }, [files]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let wordName, excelName;

    for (let index = 0; index < files.length; index++) {
      if (
        files[index].type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        await uploadFile(files[index], files[index].name);
        wordName = files[index].name;
      } else {
        await uploadFile(files[index], files[index].name);
        excelName = files[index].name;
      }
    }
    setIsLoading(false);
    setDone(true);

    const filesName = {
      word: wordName,
      excel: excelName,
    };

    const urlFiles = "https://backend-encuestas-api.herokuapp.com/files";
    axios.post(urlFiles, filesName).catch((err) => console.warn(err));
  };

  return (
    <main className="Files">
      <img src={logo} alt="Logo de la empresa" />
      <section className="Upload-files">
        <form className="Button-validate">
          <label htmlFor="uploadFile" className="Button">
            Subir archivos
          </label>
          <input
            type="file"
            id="uploadFile"
            name="uploadFile"
            multiple
            onChange={subirArchivo}
            accept=".doc,.docx,.csv,.xlsx"
          />
          {files !== null ? (
            <div className="document">
              {wordFile ? <FontAwesomeIcon icon={faFileWord} /> : ""}
              {csvFile ? <FontAwesomeIcon icon={faFileCsv} /> : ""}
            </div>
          ) : (
            <span className="hide-done" />
          )}
        </form>
        {wordFile && csvFile && !isLoading ? (
          <div className="Button-validate">
            <div className="Button" onClick={handleSubmit}>
              Aceptar
            </div>
            <span className="hide-done" />
          </div>
        ) : (
          ""
        )}
        {isLoading ? (
          <div className="isLoading">
            <ReactLoading
              type={"spinningBubbles"}
              color={"#000000"}
              height={50}
              width={50}
            />
            <span className="hide-done" />
          </div>
        ) : (
          ""
        )}
      </section>
    </main>
  );
};

export default Files;
