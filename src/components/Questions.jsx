import React, { useState, useEffect } from "react";
import Card from "./Card";

const Questions = () => {
  const [data, setData] = useState([{}]);
  const [editedBarras, setEditedBarras] = useState("");
  const [editedHistograma, setEditedHistograma] = useState("");
  const [editedBarras2, setEditedBarras2] = useState("");
  const [loading, setLoading] = useState(true);
  const [graphics, setGraphics] = useState({});
  const url = "/questions";

  /* https://backend-encuestas-api.herokuapp.com */

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [loading]);

  const createGraphic = () => {
    const updateGrapgics = {
      barras: editedBarras,
      histograma: editedHistograma,
      barras2: editedBarras2,
    };

    setGraphics(updateGrapgics);
    console.log(graphics);
  };

  return (
    <main className="Questions">
      <section className="Cards">
        {typeof data === "undefined" ? (
          <p>Loading...</p>
        ) : (
          Object.values(data).map((question, index) => {
            return (
              <section key={index}>
                <Card
                  idQuestion={Object.keys(data)[index]}
                  enunciado={question.enunciado}
                  respuestas={question.respuestas}
                  setLoading={setLoading}
                />
              </section>
            );
          })
        )}
        {/* {Object.values(api).map((question, index) => {
          return (
            <section key={index}>
              <Card
                enunciado={question.enunciado}
                respuestas={question.respuestas}
              />
            </section>
          );
        })} */}
      </section>
      <section>
        <section className="Graphics">
          <h1>GRÁFICAS</h1>
          <section className="nameGraphic">
            <div className="Name">
              <p>Gráfico de barras</p>
              <p>Gráfico de histograma</p>
              <p>Gráfico de barras</p>
            </div>
            <div>
              <input
                type="text"
                value={editedBarras}
                onChange={(e) => setEditedBarras(e.target.value)}
              />
              <input
                type="text"
                value={editedHistograma}
                onChange={(e) => setEditedHistograma(e.target.value)}
              />
              <input
                type="text"
                value={editedBarras2}
                onChange={(e) => setEditedBarras2(e.target.value)}
              />
            </div>
          </section>
        </section>
        <button onClick={createGraphic}>Crear gráficas</button>
      </section>
    </main>
  );
};

export default Questions;
