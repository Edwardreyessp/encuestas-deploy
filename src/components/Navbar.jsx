import { Link } from "react-router-dom";

const Navbar = ({ setDone }) => {
  return (
    <main className="Navbar">
      <Link to="/">
        <h1>Nombre de la empresa</h1>
      </Link>
      <section className="Routes">
        <Link
          className="route"
          to="/posestratificacion"
          onClick={() => setDone(false)}
        >
          <h4>Posestratificación</h4>
        </Link>
        <Link to="/">
          <h4>Visualización</h4>
        </Link>
      </section>
    </main>
  );
};

export default Navbar;
