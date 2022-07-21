import { useState } from "react";
import Answers from "./Answers";

const Card = ({ enunciado, respuestas }) => {
  const [statement, setStatement] = useState(false);
  const [currentID, setCurrentID] = useState("");

  const ClickStatement = () => {
    setStatement(!statement);
  };

  return (
    <main className="Card">
      <div
        className={statement ? "Statement" : "Statement-no-answers"}
        onClick={ClickStatement}
      >
        {enunciado}
      </div>
      <section className={statement ? "Answers" : "Hide-answers"}>
        {statement
          ? Object.values(respuestas).map((answer, index) => {
              return (
                <div key={index}>
                  <Answers
                    answer={answer}
                    id={Object.keys(respuestas)[index]}
                    currentID={currentID}
                    setCurrentID={setCurrentID}
                  />
                </div>
              );
            })
          : ""}
      </section>
    </main>
  );
};

export default Card;
