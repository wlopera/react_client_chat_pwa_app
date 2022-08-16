import React, { useEffect, useState } from "react";
import socket from "../Socket";
import FormMessage from "../Form/FormMessage";
import Messages from "../UI/Messages";

const Chat = ({ name }) => {
  const [messages, setMessages] = useState([]);

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
    });
    return () => {
      socket.off();
    };
  });

  return (
    <div>
      <Messages data={messages} username={name} />
      <FormMessage onMessage={sendMessage} />
    </div>
  );
};

export default Chat;
