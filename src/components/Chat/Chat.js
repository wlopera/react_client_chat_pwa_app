import React, { useEffect, useState } from "react";
import socket from "../Socket";
import FormMessage from "../Form/FormMessage";
import Messages from "../UI/Messages";

const Chat = ({ name }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([name]);

  const sendMessage = (message) => {
    socket.emit("message", name, message);
  };

  useEffect(() => {
    if (name) {
      socket.emit("login", name);
    }
  }, [name]);

  useEffect(() => {
    socket.on("messages", (message) => {
      setMessages((currentMessages) => [...currentMessages, message]);

      if (message.type === "login") {
        setUsers(message.users.map((user) => user.username));
      }

      if (message.type === "logout") {
        setUsers((currentUsers) =>
          currentUsers.filter((user) => user !== message.name)
        );
      }
    });
    return () => {
      socket.off();
    };
  });

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-3 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <span className="fs-5 d-none d-sm-inline">Conectados</span>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-left align-items-sm-start"
              id="menu"
            >
              {users &&
                users.map((user, id) => (
                  <li key={id} className="nav-item">
                    <span className="nav-link px-0 ms-1">{user}</span>
                  </li>
                ))}
            </ul>
            <hr />
          </div>
        </div>
        <div className="col-9">
          <Messages data={messages} username={name} />
          <FormMessage onMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
