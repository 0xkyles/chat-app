import { io } from "socket.io-client";
export { EVENTS } from "./events";

const SERVER = "http://localhost:3001";

const socket = io(SERVER);

export default socket;
