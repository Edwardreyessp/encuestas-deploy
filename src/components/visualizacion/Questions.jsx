import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import ReactLoading from "react-loading";

const Questions = () => {
  // const url = "https://backend-encuestas-api.herokuapp.com/questions";
  const url = "https://encuestas1.herokuapp.com/questions";
  // const url = "http://localhost:4000/questions";
  const [data, setData] = useState([{}]);
  // const [editedBarras, setEditedBarras] = useState("");
  // const [editedBarrasO, setEditedBarrasO] = useState("");
  // const [editedBarrasH, setEditedBarrasH] = useState("");
  // const [editedBarrasHO, setEditedBarrasHO] = useState("");
  // const [editedPila, setEditedPila] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [download, setDownload] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState([null, null, ""]);
  const [graphics, setGraphics] = useState({
    barras: "",
    barrasO: "",
    barrasH: "",
    barrasHO: "",
    pila: "",
  });

  useEffect(() => {
    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [loading]);

  const createGraphic = () => {
    const dbAnswer = {
      questions: data,
      graficas: graphics,
    };

    setLoadingUrl(true);

    axios
      .post(url, dbAnswer)
      .then((res) => {
        setDownload(res.data);
        setLoadingUrl(false);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <main className="Questions">
      {!loading ? (
        <section className="Cards">
          {typeof data === "undefined" ? (
            <p>Loading...</p>
          ) : (
            Object.values(data).map((question, index) => {
              return (
                <section key={index}>
                  <Card
                    data={data}
                    setData={setData}
                    idQuestion={index}
                    enunciado={question.enunciado}
                    respuestas={question.respuestas}
                    setLoading={setLoading}
                    currentAnswer={currentAnswer}
                    setCurrentAnswer={setCurrentAnswer}
                    graphics={graphics}
                    setGraphics={setGraphics}
                  />
                </section>
              );
            })
          )}
        </section>
      ) : (
        <div className="isLoadingQuestions">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#000000"}
            height={100}
            width={100}
          />
        </div>
      )}
      <section className="CreateGraphics">
        {!loadingUrl ? (
          <button onClick={createGraphic}>Crear gráficas</button>
        ) : (
          <div className="isLoading">
            <ReactLoading
              type={"spinningBubbles"}
              color={"#000000"}
              height={50}
              width={50}
            />
          </div>
        )}
        {download !== null ? (
          <div>
            <a className="button" href={download} rel="noopener noreferrer">
              <button>Descargar gráficas</button>
            </a>
          </div>
        ) : (
          ""
        )}
      </section>
      {/* <section className="Interaction">
        <section className="Graphics">
          <h1>GRÁFICAS</h1>
          <section className="nameGraphic">
            <div className="Name">
              <p>Gráfico de barras</p>
              <p>Gráfico de barras ordenado</p>
              <p>Gráfico de barras horizontal</p>
              <p>Gráfico de barras horizontal ordenado</p>
              <p>Gráfico de pila</p>
            </div>
            <div>
              <input
                type="text"
                value={editedBarras}
                onChange={(e) => setEditedBarras(e.target.value)}
              />
              <input
                type="text"
                value={editedBarrasO}
                onChange={(e) => setEditedBarrasO(e.target.value)}
              />
              <input
                type="text"
                value={editedBarrasH}
                onChange={(e) => setEditedBarrasH(e.target.value)}
              />
              <input
                type="text"
                value={editedBarrasHO}
                onChange={(e) => setEditedBarrasHO(e.target.value)}
              />
              <input
                type="text"
                value={editedPila}
                onChange={(e) => setEditedPila(e.target.value)}
              />
            </div>
          </section>
        </section>
        {!loadingUrl ? (
          <button onClick={createGraphic}>Crear gráficas</button>
        ) : (
          <div className="isLoading">
            <ReactLoading
              type={"spinningBubbles"}
              color={"#000000"}
              height={50}
              width={50}
            />
          </div>
        )}
        {download !== null ? (
          <a className="button" href={download} rel="noopener noreferrer">
            <button>Descargar gráficas</button>
          </a>
        ) : (
          ""
        )}
      </section> */}
    </main>
  );
};

export default Questions;
