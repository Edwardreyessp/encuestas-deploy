import axios from "axios";
import { useState } from "react";
import { SketchPicker } from "react-color";

const Answers = ({ color, answer, idQuestion, id, setLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const [showColor, setShowColor] = useState(false);
  const [sketchPickerColor, setSketchPickerColor] = useState(color);

  const saveColor = (event) => {
    setShowColor(!showColor);
    if (showColor) {
      event.preventDefault();

      const newColor = {
        color: sketchPickerColor,
      };

      const url = "/colors/" + idQuestion + "-" + id;

      setLoading(true);
      axios
        .put(url, newColor)
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((err) => console.warn(err));
    }
  };

  const saveAnswer = (event) => {
    event.preventDefault();

    const newAnswer = {
      respuesta: editedAnswer,
    };

    const url = "/questions/" + idQuestion + "-" + id;

    setLoading(true);
    axios
      .put(url, newAnswer)
      .then((res) => {
        console.log(res);
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
          </div>
        ) : (
          ""
        )}
        <p>{answer}</p>
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
