import { useState } from "react";
import Files from "../components/visualizacion/Files";
import Navbar from "../components/Navbar";
import Questions from "../components/visualizacion/Questions";

const Visualizacion = () => {
  const [done, setDone] = useState(false);

  return (
    <>
      <Navbar setDone={setDone} />
      {done ? <Questions /> : <Files setDone={setDone} />}
    </>
  );
};

export default Visualizacion;
