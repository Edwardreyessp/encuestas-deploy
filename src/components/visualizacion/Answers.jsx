import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

const Answers = ({
  data,
  setData,
  color,
  answer,
  idQuestion,
  id,
  setLoading,
  currentAnswer,
  setCurrentAnswer,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [realAnswer, setRealAnswer] = useState(answer);
  const [editedAnswer, setEditedAnswer] = useState(realAnswer);
  const [showColor, setShowColor] = useState(false);
  const [sketchPickerColor, setSketchPickerColor] = useState(color);
  const [cancelColor, setCancelColor] = useState(color);

  useEffect(() => {
    if (currentAnswer[0] === idQuestion && currentAnswer[1] === id - 1) {
      setShowColor(true);
    } else {
      setShowColor(false);
    }
    // eslint-disable-next-line
  }, [currentAnswer]);

  const cancelNewColor = () => {
    setCurrentAnswer([null, null, ""]);
    setShowColor(false);
    setSketchPickerColor(cancelColor);
  };

  const onColor = () => {
    if (currentAnswer[2] !== "") {
      let a = data;
      Object.values(Object.values(a)[currentAnswer[0]].respuestas)[
        currentAnswer[1]
      ].color = currentAnswer[2];
      setData(a);
    }
    if (!showColor) setCurrentAnswer([idQuestion, id - 1, sketchPickerColor]);
    setShowColor(!showColor);
    setCancelColor(sketchPickerColor);
  };

  const saveColor = (event) => {
    event.preventDefault();
    setShowColor(false);
    setCurrentAnswer([null, null, ""]);

    let a = data;
    Object.values(Object.values(a)[idQuestion].respuestas)[id - 1].color =
      sketchPickerColor;
    setCancelColor(sketchPickerColor);
    setData(a);
  };

  const saveAnswer = (event) => {
    event.preventDefault();

    let a = data;
    Object.values(Object.values(a)[idQuestion].respuestas)[id - 1].respuesta =
      editedAnswer;
    setData(a);

    setRealAnswer(editedAnswer);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <>
        <div className="edit-answer">
          <input
            type="text"
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
          />
          <span className="material-symbols-outlined" onClick={saveAnswer}>
            save
          </span>
          <span
            className="material-symbols-outlined"
            onClick={() => setIsEditing(false)}
          >
            close
          </span>
        </div>
      </>
    );
  }

  return (
    <section className="Individual-answer">
      <section>
        <div
          className="Color-answer"
          onClick={onColor}
          style={{ background: sketchPickerColor }}
        ></div>
        {showColor ? (
          <div className="Color-picker">
            <SketchPicker
              onChange={(color) => {
                setSketchPickerColor(color.hex);
                setCurrentAnswer([idQuestion, id - 1, sketchPickerColor]);
              }}
              color={sketchPickerColor}
            />
            <p className="Button-color" onClick={saveColor}>
              Aceptar
            </p>
            <p className="Button-color" onClick={cancelNewColor}>
              Cancelar
            </p>
          </div>
        ) : (
          ""
        )}
        <p>{realAnswer}</p>
      </section>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          setEditedAnswer(realAnswer);
          setIsEditing(true);
        }}
      >
        edit
      </span>
    </section>
  );
};

export default Answers;
