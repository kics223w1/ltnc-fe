import User from './models/user';

export type UserResponseErrorMessage = {
  message: string[];
  error: string;
  statusCode: number;
};

export type SignInResponse = {
  user: User;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};

export type IdEmailAndUserName = {
  email: string;
  user_id: string;
  user_name: string;
};

export type AppointmentDoneBody = {
  disease: string | null;
  level: string | null;
  underlyingDisease: string | null;
  description: string | null;
  advice: string | null;
  medicineList: { medicine_id: string; amount: number }[];
};
