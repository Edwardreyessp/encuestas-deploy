import { useState } from "react";
import logo from "../images/logo.png";
// import axios from "axios";
import { uploadFile } from "../firebase/config";
import ReactLoading from "react-loading";

const Files = ({ setDone }) => {
  const [files, setFiles] = useState(null);

  const subirArchivo = (e) => {
    for (let index = 0; index < Object.keys(e.target.files).length; index++) {
      if (
        e.target.files[index].type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        e.target.files[index].type === "text/csv"
      ) {
        setFiles(e.target.files);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let index = 0; index < Object.keys(files).length; index++) {
      uploadFile(files[index], files[index].name);
      //   const formData = new FormData();
      //   formData.append("uploadFile", files[index]);
      //   const url = "/files";
      //   axios
      //     .post(url, formData)
      //     .then((res) => console.log(res))
      //     .catch((err) => console.warn(err));
    }

    setDone(true);
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
      <ReactLoading
        type={"spinningBubbles"}
        color={"#000000"}
        height={50}
        width={50}
      />
    </main>
  );
};

export default Files;
