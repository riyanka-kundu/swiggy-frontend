export const EndPoints = {
  auth: {
    REGISTER: "/auth/register",
    LOG_IN: "/auth/login",
    OTP: "/auth/otp",
    // LOG_OUT: "auth/logout",
    REFRESH: "/refresh-token",
  },
  partner: {
    APPLY: "/auth/apply/restaurant",
    VERIFY_OTP: "/restaurant/resend-otp",
  },
  onboard: {
    RESTAURANT_DETAILS: "/restaurant/details",
    RESTAURANT_DOCUMENT: "/restaurant/documents",
    ADD_FOOD: "/add-food",
    PARTNER_CONTRACT: "/partner-contract",
  },
  dashboard: {
    MY_RESTAURANT: "/my-restaurant",
    RESTAURANT_STATUS: "/restaurant/status",
    RESTAURANT_ORDERS: "/restaurant/orders",
    PENDING_FOOD_COUNT: "/restaurant/foods/pending-count",
  },

  menu: {
    FOOD_LIST: "/food/list",
    FOOD_DETAILS: (id: string) => `/food/details/${id}`,
    FOOD_EDIT: (id: string) => `/food/edit/${id}`,
    FOOD_DELETE: (id: string) => `/food/${id}`,
    TOGGLE_AVAILABILITY: (id: string) => `/${id}/toggle-availability`,
  },
  cart: {
    ADD: "/add/cart",
    LIST: "/list/cart",
    REMOVE_ITEM: (foodId: string) => `/cart/item/${foodId}`,
  },
  order: {
    PLACE: "/order/place",
    MY_ORDERS: "/orders/my-orders",
    DETAILS: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },
};
