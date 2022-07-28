import { useState } from "react";
import Files from "./components/Files";
import Navbar from "./components/Navbar";
import Questions from "./components/Questions";

const App = () => {
  const [done, setDone] = useState(false);

  return (
    <>
      <Navbar setDone={setDone} />
      {done ? <Questions /> : <Files setDone={setDone} />}
    </>
  );
};

export default App;
