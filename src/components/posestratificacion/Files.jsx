// import axios from "axios";
import { useState } from "react";
import logo from "../../images/logo.png";
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formatos = ".xlsx,.Rda";
// const url = "";

const Files = () => {
  const [files, setFiles] = useState(null);

  const subirArchivo = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (event) => {
    let encuesta, nominal, muestra;

    for (let i = 0; i < 3; i++) {
      const fileName = files[i].name;

      if (fileName.includes("encuesta") || fileName.includes("Encuesta")) {
        encuesta = fileName;
      } else if (fileName.includes("nominal") || fileName.includes("Nominal")) {
        nominal = fileName;
      } else if (fileName.includes("muestra") || fileName.includes("Muestra")) {
        muestra = fileName;
      }
    }

    const filesNames = {
      encuesta: encuesta,
      nominal: nominal,
      muestra: muestra,
    };
    console.log(filesNames);

    // axios.post(url, filesNames).catch((err) => console.warn(err));
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
            accept={formatos}
          />
          {files.length !== 3 ? (
            <FontAwesomeIcon icon={faFileCircleCheck} />
          ) : (
            <FontAwesomeIcon icon={faFileCircleCheck} />
          )}
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
