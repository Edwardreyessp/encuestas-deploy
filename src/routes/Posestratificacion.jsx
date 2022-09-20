import { useState } from "react";
import Navbar from "../components/Navbar";
import Files from "../components/posestratificacion/Files";

const Posestratificacion = () => {
  const [done, setDone] = useState(false);

  return (
    <>
      <Navbar />
      {done ? "Hola" : <Files setDone={setDone} />}
    </>
  );
};

export default Posestratificacion;
