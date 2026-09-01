"use client";

import { QUERY_KEY } from "@/lib/query-key";
import { connectSocket } from "@/lib/socket";
import { RootState } from "@/redux/store/store";
import { OrderStatusPayload, THandleRestaurantOpenClosePayload } from "@/type";
import { UserRole } from "@/type/auth";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const authData = useSelector((state: RootState) => state.auth.data);
  const userId = authData?.data?.id;
  const role = authData?.data?.role;

  useEffect(() => {
    const socket = connectSocket();

    const handleNewOrder = () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Restaurant_Orders],
      });
      toast.success("New order received!");
    };

    const getOrderStatusMessage = (
      status: OrderStatusPayload["currentStatus"],
    ): string => {
      switch (status) {
        case "placed":
          return "Your order has been placed successfully.";

        case "accepted":
          return "Your order has been accepted by the restaurant.";

        case "preparing":
          return "Your order is now being prepared.";

        case "out_for_delivery":
          return "Your order is out for delivery. It will be with you soon!";

        case "delivered":
          return "Your order has been delivered. Enjoy your meal!";

        case "cancelled":
          return "Unfortunately, your order has been cancelled.";

        default:
          return "Your order status has been updated.";
      }
    };

    const handleOrderStatus = (payload: OrderStatusPayload) => {
      if (role === UserRole.Restaurant_Owner) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.Restaurant_Orders],
        });
      } else if (payload.userId === userId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.My_Orders],
        });

        if (payload.currentStatus === "cancelled") {
          toast.error(getOrderStatusMessage(payload.currentStatus));
        } else {
          toast.info(getOrderStatusMessage(payload.currentStatus));
        }
      }
    };

    const handleFoodStatus = () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.Food_List] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.Restaurant_Foods] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.Menu_List] });
    };

    const handleRestaurantStatus = (
      data: THandleRestaurantOpenClosePayload,
    ) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.Restaurant_List] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.My_Restaurant] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Restaurant_Foods, data.restaurantId],
      });
    };

    socket.on("restaurant:new-order", handleNewOrder);
    socket.on("order:status", handleOrderStatus);
    socket.on("food:status", handleFoodStatus);
    socket.on("restaurant:status", handleRestaurantStatus);

    return () => {
      socket.off("restaurant:new-order", handleNewOrder);
      socket.off("order:status", handleOrderStatus);
      socket.off("food:status", handleFoodStatus);
      socket.off("restaurant:status", handleRestaurantStatus);
    };
  }, [queryClient, userId, role]);

  return <>{children}</>;
};

export default SocketProvider;
