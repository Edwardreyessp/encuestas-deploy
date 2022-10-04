import { useState } from 'react';
import Navbar from '../pages/components/Navbar';
import Data from '../pages/posestratificacion/Data';
import Files from '../pages/posestratificacion/Files';

const Posestratificacion = () => {
  const [done, setDone] = useState(false);

  return (
    <>
      <Navbar />
      {done ? <Data /> : <Files setDone={setDone} />}
    </>
  );
};

export default Posestratificacion;
