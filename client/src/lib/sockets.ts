import { io } from "socket.io-client";

const SERVER = "http://localhost:3001";

const socket = io(SERVER);

export default socket;
