import React, { useState } from "react";
import { MdSend } from "react-icons/md";

import Card from "../UI/Card";

const FormMessage = ({ onMessage, onTypingMessage }) => {
  const [message, setMessage] = useState("");

  const handleSetMessage = (event) => {
    setMessage(event.target.value);
    onTypingMessage();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    onMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      onMessage(message);
      e.target.blur(); // Quitar el focus
      setMessage("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSendMessage}>
        <div className="row">
          <div className="col-8">
            <textarea
              className="form-control"
              placeholder="Introduzca su mensaje"
              id="floatingTextarea"
              value={message}
              onChange={handleSetMessage}
              onKeyDown={handleKeyPress}
              cols="30"
              rows="2"
            ></textarea>
          </div>
          <div className="col-2 items-content-center">
            <h2>
              <MdSend onClick={handleSendMessage} />
            </h2>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default FormMessage;
