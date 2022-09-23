import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <main className="Navbar">
      <Link to="/">
        <h1>Nombre de la empresa</h1>
      </Link>
      <section className="Routes">
        <Link to="/posestratificacion">
          <h4>Posestratificación</h4>
        </Link>
        <Link className="route" to="/visualizacion">
          <h4>Visualización</h4>
        </Link>
      </section>
    </main>
  );
};

export default Navbar;
