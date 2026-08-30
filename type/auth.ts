export enum UserRole {
  User = "user",
  Restaurant_Owner = "restaurant_owner",
}

export interface IApiResponse {
  Login: {
    status: boolean;
    message: string;

    data: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
    };
    accessToken: string;
    refreshToken: string;
  };

  Register: {
    status: boolean;
    message: string;
    data: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
    };
  };

  VerifyOtp: {
    status: boolean;
    message: string;
  };
  RestaurantApplyResponse: {
    status: boolean;
    message: string;
    data: {
      id: string;
      email: string;
    };
  };
}
