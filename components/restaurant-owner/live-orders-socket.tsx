"use client";

import { connectSocket } from "@/lib/socket";
import { useMyRestaurant } from "@/hooks/restaurant-owner";
import { useEffect, useRef } from "react";

const LiveOrdersSocket = () => {
  const { data: restaurant } = useMyRestaurant();
  const restaurantId = restaurant?._id;
  const joinedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!restaurantId) return;
    if (joinedRef.current === restaurantId) return;
    joinedRef.current = restaurantId;

    const socket = connectSocket();

    if (socket.connected) {
      socket.emit("restaurant:join", restaurantId);
    } else {
      socket.once("connect", () => {
        socket.emit("restaurant:join", restaurantId);
      });
    }
  }, [restaurantId]);

  return null;
};

export default LiveOrdersSocket;
