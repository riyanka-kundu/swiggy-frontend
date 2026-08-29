import { axiosInstance } from "@/lib/api";
import { EndPoints } from "@/lib/endpoints";
import { QUERY_KEY } from "@/lib/query-key";
import { Cart, Food, Order, RestaurantListItem } from "@/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ============ Food List ============
export const useUserFoodList = (enabled = true) => {
  return useQuery<Food[]>({
    queryKey: [QUERY_KEY.Food_List],
    queryFn: async () => {
      const res = await axiosInstance.get<{ data: Food[] }>(
        EndPoints.user.FOOD_LIST,
      );
      return res.data.data;
    },
    staleTime: 60 * 1000, // 1 min
    retry: false,
    enabled,
  });
};

// ============ Restaurant List ============
export const useUserRestaurantList = () => {
  return useQuery<RestaurantListItem[]>({
    queryKey: [QUERY_KEY.Restaurant_List],
    queryFn: async () => {
      const res = await axiosInstance.get<{ data: RestaurantListItem[] }>(
        EndPoints.user.RESTAURANT_LIST,
      );
      return res.data.data;
    },
    staleTime: 60 * 1000,
    retry: false,
  });
};

// ============ Foods by Restaurant ============
export const useRestaurantFoods = (
  restaurantId: string,
  enabled = true,
) => {
  return useQuery<{ restaurant: RestaurantListItem; foods: Food[] }>({
    queryKey: [QUERY_KEY.Restaurant_Foods, restaurantId],
    queryFn: async () => {
      const res = await axiosInstance.get<{
        restaurant: RestaurantListItem;
        foods: Food[];
      }>(EndPoints.user.RESTAURANT_FOODS(restaurantId));
      return { restaurant: res.data.restaurant, foods: res.data.foods };
    },
    enabled: enabled && Boolean(restaurantId),
    staleTime: 60 * 1000,
    retry: false,
  });
};

// ============ Cart ============
export const useCart = (enabled = true) => {
  return useQuery<Cart | null>({
    queryKey: [QUERY_KEY.Cart],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<{ data: Cart | [] }>(
          EndPoints.cart.LIST,
        );
        const data = res.data.data;

        // Backend returns [] when no cart exists and null after clearing it
        if (!data || Array.isArray(data) || !Array.isArray(data.items)) {
          return null;
        }

        return data;
      } catch (err: unknown) {
        const error = err as { response?: { status: number } };
        if (
          error?.response?.status === 404 ||
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return null;
        }
        throw err;
      }
    },
    enabled,
    retry: false,
  });
};

export const useAddToCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { foodId: string; quantity: number }) =>
      axiosInstance.post(EndPoints.cart.ADD, payload),
    onSuccess: (res) => {
      toast.success(res.data.message || "Item added to cart");
      qc.invalidateQueries({ queryKey: [QUERY_KEY.Cart] });
    },
    onError: (err: unknown) => {
      const error = err as { response?: { data?: { message: string } } };
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    },
  });
};

export const useRemoveFromCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (foodId: string) =>
      axiosInstance.delete(EndPoints.cart.REMOVE_ITEM(foodId)),
    onSuccess: () => {
      toast.success("Item removed from cart");
      qc.invalidateQueries({ queryKey: [QUERY_KEY.Cart] });
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });
};

// ============ Orders ============
export const useMyOrders = (enabled = true) => {
  return useQuery<Order[]>({
    queryKey: [QUERY_KEY.My_Orders],
    queryFn: async () => {
      const res = await axiosInstance.get<{ data: Order[] }>(
        EndPoints.order.MY_ORDERS,
      );
      return res.data.data;
    },
    enabled,
  });
};

export const useCancelOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) =>
      axiosInstance.put(EndPoints.order.CANCEL(orderId)),
    onSuccess: () => {
      toast.success("Order cancelled");
      qc.invalidateQueries({ queryKey: [QUERY_KEY.My_Orders] });
    },
    onError: () => {
      toast.error("Failed to cancel order");
    },
  });
};

export const usePlaceOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { address: string; paymentMethod: string }) =>
      axiosInstance.post(EndPoints.order.PLACE, payload),
    onSuccess: () => {
      toast.success("Order placed successfully!");
      qc.invalidateQueries({ queryKey: [QUERY_KEY.Cart] });
      qc.invalidateQueries({ queryKey: [QUERY_KEY.My_Orders] });
    },
    onError: (err: unknown) => {
      const error = err as { response?: { data?: { message: string } } };
      toast.error(error?.response?.data?.message || "Failed to place order");
    },
  });
};
