import { useState } from 'react';
import Answers from './Answers';
import ReactTooltip from 'react-tooltip';
import './Card.scss';

const Card = ({
  data,
  setData,
  idQuestion,
  enunciado,
  respuestas,
  setLoading,
  currentAnswer,
  setCurrentAnswer,
  graphics,
  setGraphics,
}) => {
  const [statement, setStatement] = useState(false);
  const [barras, setBarras] = useState(false);
  const [barrasO, setBarrasO] = useState(false);
  const [barrasH, setBarrasH] = useState(false);
  const [barrasHO, setBarrasHO] = useState(false);
  const [pila, setPila] = useState(false);

  const ClickStatement = () => {
    setStatement(!statement);
  };

  const Barras = () => {
    setBarras(!barras);

    if (!barras) {
      let barras = graphics.barras;
      if (barras === '') {
        barras = graphics.barras + idQuestion;
      } else {
        barras = graphics.barras + ', ' + idQuestion;
      }
      setGraphics({ ...graphics, barras });
    } else {
      let barras = graphics.barras;
      if (barras.includes(',')) {
        barras = barras.replace(idQuestion + ', ', '');
      } else {
        barras = barras.replace(idQuestion, '');
      }
      setGraphics({ ...graphics, barras });
    }
  };

  const BarrasO = () => {
    setBarrasO(!barrasO);

    if (!barrasO) {
      let barrasO = graphics.barrasO;
      if (barrasO === '') {
        barrasO = graphics.barrasO + idQuestion;
      } else {
        barrasO = graphics.barrasO + ', ' + idQuestion;
      }
      setGraphics({ ...graphics, barrasO });
    } else {
      let barrasO = graphics.barrasO;
      if (barrasO.includes(',')) {
        barrasO = barrasO.replace(idQuestion + ', ', '');
      } else {
        barrasO = barrasO.replace(idQuestion, '');
      }
      setGraphics({ ...graphics, barrasO });
    }
  };

  const BarrasH = () => {
    setBarrasH(!barrasH);

    if (!barrasH) {
      let barrasH = graphics.barrasH;
      if (barrasH === '') {
        barrasH = graphics.barrasH + idQuestion;
      } else {
        barrasH = graphics.barrasH + ', ' + idQuestion;
      }
      setGraphics({ ...graphics, barrasH });
    } else {
      let barrasH = graphics.barrasH;
      if (barrasH.includes(',')) {
        barrasH = barrasH.replace(idQuestion + ', ', '');
      } else {
        barrasH = barrasH.replace(idQuestion, '');
      }
      setGraphics({ ...graphics, barrasH });
    }
  };

  const BarrasHO = () => {
    setBarrasHO(!barrasHO);

    if (!barrasHO) {
      let barrasHO = graphics.barrasHO;
      if (barrasHO === '') {
        barrasHO = graphics.barrasHO + idQuestion;
      } else {
        barrasHO = graphics.barrasHO + ', ' + idQuestion;
      }
      setGraphics({ ...graphics, barrasHO });
    } else {
      let barrasHO = graphics.barrasHO;
      if (barrasHO.includes(',')) {
        barrasHO = barrasHO.replace(idQuestion + ', ', '');
      } else {
        barrasHO = barrasHO.replace(idQuestion, '');
      }
      setGraphics({ ...graphics, barrasHO });
    }
  };

  const Pila = () => {
    setPila(!pila);

    if (!pila) {
      let pila = graphics.pila;
      if (pila === '') {
        pila = graphics.pila + idQuestion;
      } else {
        pila = graphics.pila + ', ' + idQuestion;
      }
      setGraphics({ ...graphics, pila });
    } else {
      let pila = graphics.pila;
      if (pila.includes(',')) {
        pila = pila.replace(idQuestion + ', ', '');
      } else {
        pila = pila.replace(idQuestion, '');
      }
      setGraphics({ ...graphics, pila });
    }
  };

  return (
    <main className="Card">
      <div className={statement ? 'Statement' : 'Statement-no-answers'}>
        <p className="text" onClick={ClickStatement}>
          {enunciado}
        </p>
        <section className="Graphics">
          <div
            className={!barras ? 'Check' : 'Checked'}
            data-tip
            data-for="barras"
            onClick={Barras}
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <ReactTooltip
              className="hint"
              id="barras"
              effect="solid"
              delayShow={500}
            >
              Barras
            </ReactTooltip>
          </div>
          <div
            className={!barrasO ? 'Check' : 'Checked'}
            data-tip
            data-for="barrasO"
            onClick={BarrasO}
          >
            <span className="material-symbols-outlined">insert_chart</span>
            <ReactTooltip
              className="hint"
              id="barrasO"
              effect="solid"
              delayShow={500}
            >
              Barras ordenado
            </ReactTooltip>
          </div>
          <div
            className={!barrasH ? 'Check-rotate' : 'Checked-rotate'}
            data-tip
            data-for="barrasH"
            onClick={BarrasH}
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <ReactTooltip
              className="hint"
              id="barrasH"
              effect="solid"
              delayShow={500}
            >
              Barras horizontal
            </ReactTooltip>
          </div>
          <div
            className={!barrasHO ? 'Check-rotate' : 'Checked-rotate'}
            data-tip
            data-for="barrasHO"
            onClick={BarrasHO}
          >
            <span className="material-symbols-outlined">insert_chart</span>
            <ReactTooltip
              className="hint"
              id="barrasHO"
              effect="solid"
              delayShow={500}
            >
              Barras horizontal ordenado
            </ReactTooltip>
          </div>
          <div
            className={!pila ? 'Check' : 'Checked'}
            data-tip
            data-for="pila"
            onClick={Pila}
          >
            <span className="material-symbols-outlined">stacked_bar_chart</span>
            <ReactTooltip
              className="hint"
              id="pila"
              effect="solid"
              delayShow={500}
            >
              Pila
            </ReactTooltip>
          </div>
        </section>
      </div>
      <section className={statement ? 'Answers' : 'Hide-answers'}>
        {statement
          ? Object.values(respuestas).map((answer, index) => {
              return (
                <div key={index}>
                  <Answers
                    data={data}
                    setData={setData}
                    color={answer.color}
                    answer={answer.respuesta}
                    idQuestion={idQuestion}
                    id={Object.keys(respuestas)[index]}
                    setLoading={setLoading}
                    currentAnswer={currentAnswer}
                    setCurrentAnswer={setCurrentAnswer}
                  />
                </div>
              );
            })
          : ''}
      </section>
    </main>
  );
};

export default Card;
