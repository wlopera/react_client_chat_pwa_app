import React, { useState } from "react";
import Chat from "../Chat/Chat";
import Card from "../UI/Card";

const FormUser = () => {
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!name !== "") {
      setRegister(true);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const context = register ? (
    <Chat name={name} />
  ) : (
    <div style={{ width: "40%" }}>
      <Card title="Conexión">
        <form onSubmit={registerSubmit}>
          <div className="mb-3 row">
            <input
              type="text"
              id="name"
              placeholder="Nombre de usuario"
              value={name}
              onChange={handleName}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ir al Chat
          </button>
        </form>
      </Card>
    </div>
  );

  return context;
};

export default FormUser;
