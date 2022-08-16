import io from "socket.io-client";
const { BACKEND_URL } = window["runConfig"];

const socket = io(BACKEND_URL);

export default socket;
