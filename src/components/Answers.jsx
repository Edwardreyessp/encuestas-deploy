import axios from "axios";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

const Answers = ({
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
    if (currentAnswer[0] !== idQuestion || currentAnswer[1] !== id) {
      setShowColor(false);
    } else if (currentAnswer[0] === idQuestion && currentAnswer[1] === id) {
      setShowColor(true);
    }
    // eslint-disable-next-line
  }, [currentAnswer]);

  const cancelNewColor = () => {
    setCurrentAnswer([0, 0, "", ""]);
    setShowColor(false);
    setSketchPickerColor(cancelColor);
  };

  const onColor = () => {
    if (currentAnswer[2] !== "") {
      const updateAnswer = {
        color: currentAnswer[2],
        respuesta: currentAnswer[3],
      };

      const url = "/questions/" + currentAnswer[0] + "-" + currentAnswer[1];

      axios
        .put(url, updateAnswer)
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    }
    setCurrentAnswer([idQuestion, id, sketchPickerColor, editedAnswer]);
  };

  const saveColor = (event) => {
    setCurrentAnswer([0, 0, "", ""]);
    setShowColor(!showColor);
    if (showColor) {
      setCancelColor(sketchPickerColor);
      event.preventDefault();

      const newColor = {
        color: sketchPickerColor,
        respuesta: editedAnswer,
      };

      const url = "/questions/" + idQuestion + "-" + id;

      axios
        .put(url, newColor)
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    }
  };

  const saveAnswer = (event) => {
    setRealAnswer(editedAnswer);
    event.preventDefault();

    const newAnswer = {
      respuesta: editedAnswer,
      color: sketchPickerColor,
    };

    const url = "/questions/" + idQuestion + "-" + id;

    axios
      .put(url, newAnswer)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => console.warn(err));

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
                setCurrentAnswer([
                  idQuestion,
                  id,
                  sketchPickerColor,
                  editedAnswer,
                ]);
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
