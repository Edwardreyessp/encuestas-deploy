import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import ReactLoading from "react-loading";

const Questions = () => {
  const [data, setData] = useState([{}]);
  const [editedBarras, setEditedBarras] = useState("");
  const [editedHistograma, setEditedHistograma] = useState("");
  const [editedBarras2, setEditedBarras2] = useState("");
  const [loading, setLoading] = useState(true);
  const url = "/questions";
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [download, setDownload] = useState(null);

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

    console.log(updateGrapgics);
    setLoadingUrl(true);

    axios
      .post(url, updateGrapgics)
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
                    idQuestion={Object.keys(data)[index]}
                    enunciado={question.enunciado}
                    respuestas={question.respuestas}
                    setLoading={setLoading}
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
      </section>
    </main>
  );
};

export default Questions;
