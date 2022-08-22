# react_client_chat_pwa_app
Chat Personal realizado en React - Socket.io y uso de NodeJS

## Chat Personal hecho en React - socket.io y uso de nodeJS
ver: https://github.com/wlopera/node-server-chat-personal

### Se conecta Messi
![Captura](https://user-images.githubusercontent.com/7141537/184449088-819b4958-4600-4432-902e-37ff7e3565dd.PNG)

### Se conecta Neymar
![Captura1](https://user-images.githubusercontent.com/7141537/184449089-81b2153c-559a-4597-9ff3-728b0453e129.PNG)

![Captura2](https://user-images.githubusercontent.com/7141537/184449090-d13502ad-a45f-4805-b299-0f43b1e0b8e4.PNG)

### Se envian mensajes
![Captura3](https://user-images.githubusercontent.com/7141537/184449091-8beb43c8-88e6-4e62-9501-92528a053091.PNG)
![Captura4](https://user-images.githubusercontent.com/7141537/184449092-924e72fc-e9a5-46ac-a7f4-f69fde866245.PNG)
![Captura5](https://user-images.githubusercontent.com/7141537/184449093-1ef39d5c-ae4f-47a6-bdc5-118acf1c11f2.PNG)
![Captura6](https://user-images.githubusercontent.com/7141537/184449083-d90fe125-2817-4103-8ee1-fa1c9971e31a.PNG)
![Captura7](https://user-images.githubusercontent.com/7141537/184449085-0ab3a683-8858-4354-b9c0-7d85b5766a97.PNG)
![Captura8](https://user-images.githubusercontent.com/7141537/184449086-86b6ee49-bea0-43cb-874a-8b28a5ff5968.PNG)

### Neymar sierra la sesión
![Captura9](https://user-images.githubusercontent.com/7141537/184449087-08d8660b-5bab-458a-a06f-7f9bc9487e04.PNG)

### Ajuste de tipo y hora. Agregar colores
![Captura](https://user-images.githubusercontent.com/7141537/184454913-96b96ae5-8443-4035-9ebb-ca40abaefead.PNG)

### Ajuste de estilos y colores
![Captura](https://user-images.githubusercontent.com/7141537/184986655-bc1e1d65-a006-4452-955b-3256ceb6fc6b.PNG)

## importante para subir al repo remote

### ChatPersonal\react_client_chat_pwa_app\public\runtime-config.js
```
window["runConfig"] = {
  // BACKEND_URL: "http://localhost:8585", //Desarrollo
  BACKEND_URL: "https://node-chat-personal.herokuapp.com/", // Produccion
};

```
### ChatPersonal\react_client_chat_pwa_app\src\components\Socket.js
```
import io from "socket.io-client";
const { BACKEND_URL } = window["runConfig"];

const socket = io(BACKEND_URL);

export default socket;
```
ChatPersonal\react_client_chat_pwa_app\src\components\Chat\Chat.js

## Agregar usuarios conectados
ChatPersonal\react_client_chat_pwa_app\src\components\Chat\Chat.js
```
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
    <div className="">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto px-0 bg-dark">
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
          <div className="col">
            <Messages data={messages} username={name} />
            <FormMessage onMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
```
![Captura](https://user-images.githubusercontent.com/7141537/185668298-23be0c28-ec15-4728-b50d-8d5e970dc9ed.PNG)

## Agregar entrada y salida de usuarios conectados y mensaje de los usuarios que estan escribiendo
![Captura](https://user-images.githubusercontent.com/7141537/186037776-c96674a4-8d44-46d5-a35c-71fe1a211271.PNG)

