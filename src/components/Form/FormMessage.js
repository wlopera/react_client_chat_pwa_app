import React, { useState } from "react";
import Card from "../UI/Card";

const FormMessage = ({ onMessage }) => {
  const [message, setMessage] = useState("");

  const handleSetMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    onMessage(message);
    setMessage("");
  };

  return (
    <Card title="Enviar mensajes">
      <form onSubmit={handleSendMessage}>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Introduzca su mensaje"
            id="floatingTextarea"
            value={message}
            onChange={handleSetMessage}
            cols="30"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </Card>
  );
};

export default FormMessage;
