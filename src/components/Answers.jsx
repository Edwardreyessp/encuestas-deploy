import axios from "axios";
import { useState } from "react";
import { SketchPicker } from "react-color";

const Answers = ({ color, answer, idQuestion, id, setLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const [showColor, setShowColor] = useState(false);
  const [sketchPickerColor, setSketchPickerColor] = useState(color);
  const [cancelColor, setCancelColor] = useState(color);

  const cancelNewColor = () => {
    setShowColor(false);
    setSketchPickerColor(cancelColor);
  };

  const saveColor = (event) => {
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
          onClick={saveColor}
          style={{ background: sketchPickerColor }}
        ></div>
        {showColor ? (
          <div className="Color-picker">
            <SketchPicker
              onChange={(color) => {
                setSketchPickerColor(color.hex);
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
        <p>{editedAnswer}</p>
      </section>
      <span
        className="material-symbols-outlined"
        onClick={() => setIsEditing(true)}
      >
        edit
      </span>
    </section>
  );
};

export default Answers;
