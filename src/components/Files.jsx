import logo from "../images/logo.png";

const Files = () => {
  return (
    <main className="Files">
      <img src={logo} alt="Logo de la empresa" />
      <section className="Upload-files">
        <div className="Button-validate">
          <div className="Button">
            <h3>Subir cuestionario</h3>
          </div>
          <span className="material-symbols-outlined">done</span>
        </div>
        <div className="Button-validate">
          <div className="Button">
            <h3>Subir respuestas</h3>
          </div>
          <span className="material-symbols-outlined">done</span>
        </div>
      </section>
    </main>
  );
};

export default Files;
