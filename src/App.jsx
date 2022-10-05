import ReactDOM from 'react-dom/client';
import Visualizacion from './routes/Visualizacion';
import Posestratificacion from './routes/Posestratificacion';
import Muestreo from './routes/Muestreo';
import './main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/muestreo" element={<Muestreo />} />
      <Route path="/posestratificacion" element={<Posestratificacion />} />
      <Route path="/visualizacion" element={<Visualizacion />} />
      <Route path="/" element={<Visualizacion />} />
    </Routes>
  </BrowserRouter>
);
