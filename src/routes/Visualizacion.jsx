import { useState } from 'react';
import Files from '../pages/visualizacion/Files';
import Navbar from '../pages/components/Navbar';
import Questions from '../pages/visualizacion/Questions';

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
