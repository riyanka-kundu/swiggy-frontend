export interface IApiResponse {
  Login: {
    status: boolean;
    message: string;

    data: {
      id: string;
      name: string;
      email: string;
      role: string;
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
      role: string;
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
