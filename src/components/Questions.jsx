import React, { useState } from "react";
import Card from "./Card";

const Questions = () => {
  // const [data, setData] = useState([{}]);
  const [editedBarras, setEditedBarras] = useState("");
  const [editedHistograma, setEditedHistograma] = useState("");
  const [editedBarras2, setEditedBarras2] = useState("");
  const [graphics, setGraphics] = useState({});

  /* useEffect(() => {
    fetch("/questions")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []); */

  const api = {
    Q_3_1: {
      enunciado:
        "Si hoy fuera la elecci\u00f3n para elegir diputados federales, \u00bfpor cu\u00e1l partido votar\u00eda usted? ",
      respuestas: {
        1: "Partido Acci\u00f3n Nacional (PAN)",
        2: "Partido Revolucionario Institucional (PRI)",
        3: "Partido de la Revoluci\u00f3n Democr\u00e1tica (PRD)",
        4: "Partido del Trabajo (PT)",
        5: "Partido Verde Ecologista de M\u00e9xico (PVEM)",
        6: "Movimiento Ciudadano (MC)",
        7: "Morena",
        8: "Candidato Independiente",
        9: "Anular\u00eda",
        10: "Ninguno",
        11: "Prefiero no contestar",
      },
    },
    Q_3_11: {
      enunciado:
        "\u00bfUsted dir\u00eda que es una persona que se interesa mucho, algo, poco o nada en la pol\u00edtica?",
      respuestas: {
        1: "Mucho",
        2: "Algo",
        3: "Poco",
        4: "Nada",
        5: "Ns/Nc (esp)",
      },
    },
    Q_6_1: {
      enunciado:
        "En general, \u00bfusted aprueba o desaprueba la forma en que El Presidente de la Rep\u00fablica Andr\u00e9s Manuel L\u00f3pez Obrador realiza su trabajo? \u00bfMucho o algo?",
      respuestas: {
        1: "Respuesta:",
        2: "Aprueba mucho",
        3: "Aprueba algo",
        4: "Ni aprueba ni desaprueba (esp)",
        5: "Desaprueba algo",
        6: "Desaprueba mucho",
        7: "Ns/Nc (esp)",
      },
    },
    Q_6_2: {
      enunciado:
        "En general, \u00bfusted aprueba o desaprueba la forma en que El Gobernador / Jefa de gobierno realiza su trabajo? \u00bfMucho o algo?",
      respuestas: {
        1: "Respuesta:",
        2: "Aprueba mucho",
        3: "Aprueba algo",
        4: "Ni aprueba ni desaprueba (esp)",
        5: "Desaprueba algo",
        6: "Desaprueba mucho",
        7: "Ns/Nc (esp)",
      },
    },
    Q_6_3: {
      enunciado:
        "En general, \u00bfusted aprueba o desaprueba la forma en que El Presidente Municipal / Alcalde realiza su trabajo? \u00bfMucho o algo?",
      respuestas: {
        1: "Respuesta:",
        2: "Aprueba mucho",
        3: "Aprueba algo",
        4: "Ni aprueba ni desaprueba (esp)",
        5: "Desaprueba algo",
        6: "Desaprueba mucho",
        7: "Ns/Nc (esp)",
      },
    },
    Q_6_4: {
      enunciado:
        "En general, \u00bfusted aprueba o desaprueba la forma en que El presidente nacional de Morena Mario Delgado realiza su trabajo? \u00bfMucho o algo?",
      respuestas: {
        1: "Respuesta:",
        2: "Aprueba mucho",
        3: "Aprueba algo",
        4: "Ni aprueba ni desaprueba (esp)",
        5: "Desaprueba algo",
        6: "Desaprueba mucho",
        7: "Ns/Nc (esp)",
      },
    },
    Q_6_5: {
      enunciado:
        "En general, \u00bfusted aprueba o desaprueba la forma en que El presidente del INE Lorenzo C\u00f3rdova realiza su trabajo? \u00bfMucho o algo?",
      respuestas: {
        1: "Respuesta:",
        2: "Aprueba mucho",
        3: "Aprueba algo",
        4: "Ni aprueba ni desaprueba (esp)",
        5: "Desaprueba algo",
        6: "Desaprueba mucho",
        7: "Ns/Nc (esp)",
      },
    },
    Q_6_6: {
      enunciado:
        "En general, \u00bfusted aprueba o desaprueba la forma en que El Secretario de Relaciones exteriores Marcelo Ebrard realiza su trabajo? \u00bfMucho o algo?",
      respuestas: {
        1: "Respuesta:",
        2: "Aprueba mucho",
        3: "Aprueba algo",
        4: "Ni aprueba ni desaprueba (esp)",
        5: "Desaprueba algo",
        6: "Desaprueba mucho",
        7: "Ns/Nc (esp)",
      },
    },
    Q_6_7: {
      enunciado:
        "En general, \u00bfusted aprueba o desaprueba la forma en que La Jefa de Gobierno de la CDMX Claudia Sheinbaum realiza su trabajo? \u00bfMucho o algo?",
      respuestas: {
        1: "Respuesta:",
        2: "Aprueba mucho",
        3: "Aprueba algo",
        4: "Ni aprueba ni desaprueba (esp)",
        5: "Desaprueba algo",
        6: "Desaprueba mucho",
        7: "Ns/Nc (esp)",
      },
    },
    Q_6_8: {
      enunciado:
        "En general, \u00bfusted aprueba o desaprueba la forma en que El senador Ricardo Monreal  realiza su trabajo? \u00bfMucho o algo?",
      respuestas: {
        1: "Respuesta:",
        2: "Aprueba mucho",
        3: "Aprueba algo",
        4: "Ni aprueba ni desaprueba (esp)",
        5: "Desaprueba algo",
        6: "Desaprueba mucho",
        7: "Ns/Nc (esp)",
      },
    },
    Q_6_9: {
      enunciado:
        "En general, \u00bfusted aprueba o desaprueba la forma en que El Secretario de Gobernaci\u00f3n Ad\u00e1n Augusto L\u00f3pez Hern\u00e1ndez realiza su trabajo? \u00bfMucho o algo?",
      respuestas: {
        1: "Respuesta:",
        2: "Aprueba mucho",
        3: "Aprueba algo",
        4: "Ni aprueba ni desaprueba (esp)",
        5: "Desaprueba algo",
        6: "Desaprueba mucho",
        7: "Ns/Nc (esp)",
      },
    },
    Q_10_1: {
      enunciado:
        "Pensando en los problemas del pa\u00eds, \u00bfcu\u00e1l cree usted que es el problema m\u00e1s importante en estos momentos? ",
      respuestas: {
        1: "[Respuesta espont\u00e1nea] ",
        2: "Inseguridad ",
        3: "Crisis econ\u00f3mica ",
        4: "Narcotr\u00e1fico ",
        5: "Mal gobierno/Gobernantes ",
        6: "Desempleo ",
        7: "Educaci\u00f3n ",
        8: "Servicios de salud",
        9: "Contagios de covid-19",
        10: "Otro \u00bfCu\u00e1l? _______________________",
        11: "Ns/Nc",
      },
    },
  };

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
        {/* {typeof data === "undefined" ? (
          <p>Loading...</p>
        ) : (
          Object.values(data).map((question, index) => {
            return (
              <section key={index}>
                <Card
                  enunciado={question.enunciado}
                  respuestas={question.respuestas}
                />
              </section>
            );
          })
        )} */}
        {Object.values(api).map((question, index) => {
          return (
            <section key={index}>
              <Card
                enunciado={question.enunciado}
                respuestas={question.respuestas}
              />
            </section>
          );
        })}
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

/* data.map((question, i) => {
            return (
              <section key={i}>
                <Card
                  enunciado={question.enunciado}
                  respuestas={question.respuestas}
                />
              </section>
            );
          }) */
