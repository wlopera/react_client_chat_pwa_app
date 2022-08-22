import React, { useEffect, useState } from "react";
import socket from "../Socket";
import { isMobile } from "react-device-detect";

import FormMessage from "../Form/FormMessage";
import Messages from "../UI/Messages";
import { getMessage, openNav, closeNav } from "../../util/Utilities";

import styles from "./Chat.module.css";

const Chat = ({ name }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([{ name: name, typing: "" }]);

  const sendMessage = (message) => {
    socket.emit("message", name, message);
  };

  const typingMessage = () => {
    socket.emit("typing", name, "Escribiendo mensaje");
  };

  useEffect(() => {
    if (name) {
      socket.emit("login", name);
      handleCloseNav();
    }
  }, [name]);

  useEffect(() => {
    socket.on("messages", (message) => {
      getMessage(setUsers, setMessages, message);
    });
    return () => {
      socket.off();
    };
  });

  const handleOpenNav = () => {
    openNav(isMobile);
  };

  const handleCloseNav = () => {
    closeNav(isMobile);
  };

  return (
    <div>
      <div className={styles.sidebar} id="sidebar">
        <a href="#" className={styles.closebtn} onClick={handleCloseNav}>
          ×
        </a>
        <ul className="" id="menu">
          {users &&
            users.map((user, id) => (
              <li
                key={id}
                className="nav-item"
                style={{ borderBottom: "1px solid white" }}
              >
                <span className="nav-link px-0 ms-1">{user.name}</span>
                <span className="px-0 ms-1 text-white">{user.typing}</span>
              </li>
            ))}
        </ul>
        <hr />
      </div>
      <div className={styles.main} id="main">
        <button className={styles.openbtn} onClick={handleOpenNav}>
          ☰ Conectados
        </button>
        <Messages data={messages} username={name} />
        <FormMessage onMessage={sendMessage} onTypingMessage={typingMessage} />
      </div>
    </div>
  );
};

export default Chat;
