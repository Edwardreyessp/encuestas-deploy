import ReactDOM from 'react-dom/client';
import Visualizacion from './routes/Visualizacion';
import Posestratificacion from './routes/Posestratificacion';
import Muestreo from './routes/Muestreo';
import './main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
