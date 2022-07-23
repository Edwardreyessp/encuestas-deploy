import { useState } from "react";
import logo from "../images/logo.png";
import axios from "axios";

const Files = ({ setDone }) => {
  const [files, setFiles] = useState(null);

  const subirArchivo = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let index = 0; index < 2; index++) {
      const formData = new FormData();
      formData.append("uploadFile", files[index]);

      axios
        .post("/questions", formData)
        .then((res) => console.log(res))
        .catch((err) => console.warn(err));
    }

    // setDone(true);
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
          />
          {files !== null ? (
            <span className="material-symbols-outlined">done</span>
          ) : (
            <span className="hide-done" />
          )}
        </form>
        {files !== null ? (
          <div className="Button-validate">
            <div className="Button" onClick={handleSubmit}>
              Aceptar
            </div>
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
