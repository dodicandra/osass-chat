type StackAuth<T = object> = {
  Login: T | undefined;
  UserNameVerifikasi: T | undefined;
  MainApp: T | undefined;
  Register: T | undefined;
};

type StackMainApp<T = object> = {
  Home: T | undefined;
  UserProfile: T | undefined;
};
