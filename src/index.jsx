import ReactDOM from "react-dom/client";
import App from "./App";
import "./Index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/nosotros" element={<App />} />
    </Routes>
  </BrowserRouter>
);
