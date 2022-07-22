import { useState } from "react";
import logo from "../images/logo.png";

const Files = ({ setDone }) => {
  const [files, setFiles] = useState(null);

  const subirArchivo = (e) => {
    setFiles(e.target.files);
  };

  return (
    <main className="Files">
      <img src={logo} alt="Logo de la empresa" />
      <section className="Upload-files">
        <form className="Button-validate">
          <label htmlFor="file" className="Button">
            Subir archivos
          </label>
          <input type="file" id="file" multiple onChange={subirArchivo} />
          {files !== null ? (
            <span className="material-symbols-outlined">done</span>
          ) : (
            <span className="hide-done" />
          )}
        </form>
        {files !== null ? (
          <div className="Button-validate">
            <label className="Button" onClick={() => setDone(true)}>
              Aceptar
            </label>
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
