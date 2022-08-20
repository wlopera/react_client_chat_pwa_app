import React, { useEffect, useState } from "react";
import socket from "../Socket";
import { isMobile } from "react-device-detect";

import FormMessage from "../Form/FormMessage";
import Messages from "../UI/Messages";

import styles from "./Chat.module.css";

const Chat = ({ name }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([name]);

  const sendMessage = (message) => {
    socket.emit("message", name, message);
  };

  useEffect(() => {
    if (name) {
      socket.emit("login", name);
      closeNav();
    }
  }, [name]);

  useEffect(() => {
    socket.on("messages", (message) => {
      console.log(33333, message);
      setMessages((currentMessages) => [...currentMessages, message]);

      if (message.type === "login") {
        setUsers(message.users.map((user) => user.username));
      }

      if (message.type === "logout") {
        setUsers((currentUsers) =>
          currentUsers.filter((user) => user !== message.name)
        );
        socket.off();
      }
    });
    return () => {
      socket.off();
    };
  });

  const openNav = () => {
    if (isMobile) {
      document.getElementById("mySidebar").style.width = "35%";
      document.getElementById("main").style.width = "65%";
      document.getElementById("main").style.marginLeft = "35%";
    } else {
      document.getElementById("mySidebar").style.width = "15%";
      document.getElementById("main").style.marginLeft = "15%";
    }
  };

  const closeNav = () => {
    if (isMobile) {
      document.getElementById("main").style.width = "100%";
    } else {
      document.getElementById("main").style.marginLeft = "60%";
    }
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  };

  return (
    <div>
      <div className={styles.sidebar} id="mySidebar">
        <a href="#" className={styles.closebtn} onClick={closeNav}>
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
                <span className="nav-link px-0 ms-1">{user}</span>
              </li>
            ))}
        </ul>
        <hr />
      </div>
      <div className={styles.main} id="main">
        <button className={styles.openbtn} onClick={openNav}>
          ☰ Conectados
        </button>
        <Messages data={messages} username={name} />
        <FormMessage onMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
