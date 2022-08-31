import { useState } from "react";
import Navbar from "../components/Navbar";
import Files from "../components/posestratificacion/Files";

const Posestratificación = () => {
  const [done, setDone] = useState(false);
  return (
    <>
      <Navbar />
      {done ? "" : <Files setDone={setDone} />}
    </>
  );
};

export default Posestratificación;
