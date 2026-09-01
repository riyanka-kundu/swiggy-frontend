import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  // const cookie = new Cookies();
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
      // auth: { token: cookie.get(ACCESS_TOKEN) },
      autoConnect: true,
      withCredentials: true,
      reconnection: true,
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
