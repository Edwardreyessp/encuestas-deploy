import ReactDOM from 'react-dom/client';
import Visualizacion from './routes/Visualizacion';
import Posestratificacion from './routes/Posestratificacion';
import Muestreo from './routes/Muestreo';
import SingUp from './routes/SingUp';
import SingIn from './routes/SingIn';
import './main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthProvider } from './components/context/authContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { UrlProvider } from './components/context/BaseUrl';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UrlProvider>
        <Routes>
          <Route path="/sing-in" element={<SingIn />} />
          <Route path="/sing-up" element={<SingUp />} />
          <Route path="/muestreo" element={<Muestreo />} />
          <Route path="/posestratificacion" element={<Posestratificacion />} />
          <Route path="/visualizacion" element={<Visualizacion />} />
          <Route path="/" element={<Visualizacion />} />
        </Routes>
        <ToastContainer autoClose={3000} />
      </UrlProvider>
    </AuthProvider>
  </BrowserRouter>
);
