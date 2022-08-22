/**
 * login Conectarse al chat.
 *
 * @param {*} setUsers Actualizar usaurios conectados
 * @param {*} setMessages Actualizar mensajes
 * @param {*} message  Mensajes recibidos
 */
const login = (setUsers, setMessages, message) => {
  let newUsers = [];
  message.users.forEach((user) => {
    if (user.username) {
      newUsers.push({ name: user.username, typing: "" });
    }
  });
  setUsers(newUsers);
  setMessages((currentMessages) => [...currentMessages, message]);
};

/**
 * logout Desconectarse del chat.
 *
 * @param {*} setUsers Actualizar usaurios conectados
 * @param {*} setMessages Actualizar mensajes
 * @param {*} message  Mensajes recibidos
 */
const logout = (setUsers, setMessages, message) => {
  setMessages((currentMessages) => [...currentMessages, message]);
  setUsers((currentUsers) =>
    currentUsers.filter((user) => user.name !== message.name)
  );
};

/**
 * typing Notificar incio de escritura de mensaje al chat.
 *
 * @param {*} setUsers Actualizar usaurios conectados
 * @param {*} message  Mensajes recibidos
 */
const typing = (setUsers, message) => {
  setUsers((currentUsers) => {
    return currentUsers.map((user) => {
      if (user.name === message.name) {
        return { name: user.name, typing: message.message };
      }
      return user;
    });
  });
};

/**
 * setMessage Mostrar mensajes en la ventana del chat.
 *
 * @param {*} setUsers Actualizar usaurios conectados
 * @param {*} setMessages Actualizar mensajes
 * @param {*} message  Mensajes recibidos
 */
const setMessage = (setUsers, setMessages, message) => {
  setMessages((currentMessages) => [...currentMessages, message]);
  setUsers((currentUsers) => {
    return currentUsers.map((user) => {
      if (user.name === message.name) {
        return { name: user.name, typing: "" };
      }
      return user;
    });
  });
};

/**
 * getMessage Rutina para control de tipos de mensajes entradas  o salidas.
 * @param {*} setUsers Actualizar usaurios conectados
 * @param {*} setMessages Actualizar mensajes
 * @param {*} message  Mensajes recibidos
 */
export const getMessage = (setUsers, setMessages, message) => {
  switch (message.type) {
    case "login":
      return login(setUsers, setMessages, message);

    case "logout":
      return logout(setUsers, setMessages, message);

    case "typing":
      return typing(setUsers, message);

    default:
      return setMessage(setUsers, setMessages, message);
  }
};

/**
 * openNav Mostrar el sidebar para celulares o WEB
 *
 * @param {*} isMobile Tipo de componente Celular/WEB
 */
export const openNav = (isMobile) => {
  if (isMobile) {
    document.getElementById("sidebar").style.width = "35%";
    document.getElementById("main").style.width = "65%";
    document.getElementById("main").style.marginLeft = "35%";
  } else {
    document.getElementById("sidebar").style.width = "15%";
    document.getElementById("main").style.marginLeft = "15%";
  }
};

/**
 * closeNav Ocultar el sidebar para celulares o WEB
 *
 * @param {*} isMobile Tipo de componente Celular/WEB
 */
export const closeNav = (isMobile) => {
  if (isMobile) {
    document.getElementById("main").style.width = "100%";
  } else {
    document.getElementById("main").style.marginLeft = "60%";
  }
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
};
