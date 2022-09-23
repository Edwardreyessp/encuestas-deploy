import ReactDOM from 'react-dom/client';
import Visualizacion from './routes/Visualizacion';
import Posestratificacion from './routes/Posestratificacion';
import './Index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/posestratificacion" element={<Posestratificacion />} />
      <Route path="/visualizacion" element={<Visualizacion />} />
      <Route path="/" element={<Visualizacion />} />
    </Routes>
  </BrowserRouter>
);
