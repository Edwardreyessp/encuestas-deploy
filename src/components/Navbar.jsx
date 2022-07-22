import { Link } from "react-router-dom";

const Navbar = ({ setDone }) => {
  return (
    <main className="Navbar">
      <Link to="/">
        <h1>Nombre de la empresa</h1>
      </Link>
      <section className="Routes">
        <Link className="Inicio" to="/" onClick={() => setDone(false)}>
          <h4>Inicio</h4>
        </Link>
        <Link to="/nosotros">
          <h4>Nosotros</h4>
        </Link>
      </section>
    </main>
  );
};

export default Navbar;
