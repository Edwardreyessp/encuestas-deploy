import { useState } from 'react';
import Navbar from '../components/utils/Navbar';
import Data from '../components/posestratificacion/Data';
import Files from '../components/posestratificacion/Files';

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
