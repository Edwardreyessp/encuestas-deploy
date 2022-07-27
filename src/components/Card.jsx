import { useState } from "react";
import Answers from "./Answers";

const Card = ({ idQuestion, enunciado, respuestas, setLoading }) => {
  const [statement, setStatement] = useState(false);

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
                    color={answer.color}
                    answer={answer.respuesta}
                    idQuestion={idQuestion}
                    id={Object.keys(respuestas)[index]}
                    setLoading={setLoading}
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
