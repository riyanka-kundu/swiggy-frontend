import { axiosInstance } from "@/lib/api";
import { EndPoints } from "@/lib/endpoints";
import { QUERY_KEY } from "@/lib/query-key";
import { Food, Order } from "@/type";
import { Restaurant } from "@/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMyRestaurant = () => {
  return useQuery<Restaurant | null>({
    queryKey: [QUERY_KEY.My_Restaurant],
    queryFn: async () => {
      const res = await axiosInstance.get<{
        status: boolean;
        hasRestaurant: boolean;
        data: Restaurant;
      }>(EndPoints.dashboard.MY_RESTAURANT);
      return res.data.data ?? null;
    },
  });
};


export const useRestaurantOrders = () => {
  return useQuery<Order[]>({
    queryKey: [QUERY_KEY.Restaurant_Orders],
    queryFn: async () => {
      const res = await axiosInstance.get<{ data: Order[] }>(
        EndPoints.dashboard.RESTAURANT_ORDERS,
      );
      return res.data.data;
    },
    refetchInterval: 30 * 1000, // poll every 30s for new orders
  });
};

export const useMenuList = () => {
  return useQuery<Food[]>({
    queryKey: [QUERY_KEY.Menu_List],
    queryFn: async () => {
      const res = await axiosInstance.get<{ data: Food[] }>(
        EndPoints.menu.FOOD_LIST,
      );
      return res.data.data;
    },
  });
};

export const useToggleAvailability = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (foodId: string) =>
      axiosInstance.patch(EndPoints.menu.TOGGLE_AVAILABILITY(foodId)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.Menu_List] });
    },
    onError: () => {
      toast.error("Failed to toggle availability");
    },
  });
};

export const useDeleteFood = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (foodId: string) =>
      axiosInstance.delete(EndPoints.menu.FOOD_DELETE(foodId)),
    onSuccess: () => {
      toast.success("Food item deleted");
      qc.invalidateQueries({ queryKey: [QUERY_KEY.Menu_List] });
    },
    onError: () => {
      toast.error("Failed to delete food item");
    },
  });
};

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      axiosInstance.put(EndPoints.order.UPDATE_STATUS(orderId), { status }),
    onSuccess: () => {
      toast.success("Order status updated");
      qc.invalidateQueries({ queryKey: [QUERY_KEY.Restaurant_Orders] });
    },
    onError: () => {
      toast.error("Failed to update order status");
    },
  });
};

export const usePendingFoodCount = () => {
  return useQuery<number>({
    queryKey: [QUERY_KEY.Pending_Food_Count],
    queryFn: async () => {
      const res = await axiosInstance.get<{ data: { count: number } }>(
        EndPoints.dashboard.PENDING_FOOD_COUNT,
      );
      return res.data.data.count;
    },
  });
};

export const useToggleRestaurantStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (isOpen: boolean) =>
      axiosInstance.patch(EndPoints.dashboard.RESTAURANT_STATUS, { isOpen }),
    onSuccess: (res) => {
      toast.success(res.data.message || "Restaurant status updated");
      qc.invalidateQueries({ queryKey: [QUERY_KEY.My_Restaurant] });
    },
    onError: (err: unknown) => {
      const error = err as { response?: { data?: { message: string } } };
      toast.error(
        error?.response?.data?.message || "Failed to update restaurant status",
      );
    },
  });
};



