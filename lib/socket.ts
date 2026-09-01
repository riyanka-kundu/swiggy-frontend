import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
      autoConnect: false,
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ["websocket", "polling", "webtransport"],
    });
  }

  return socket;
}

export function connectSocket(): Socket {
  const s = getSocket();

  if (!s.connected) {
    s.connect();
  }

  return s;
}
