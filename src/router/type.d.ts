type StackAuth<T = object> = {
  Login: T | undefined;
  UserNameVerifikasi: T | undefined;
  MainApp: T | undefined;
  Register: T | undefined;
};

type StackMainApp<T = object> = {
  Home: T | undefined;
  UserProfile: T | undefined;
  UserVisited: T | undefined;
  Chat: T | undefined;
};

type DrawerStack<T = object> = StackMainApp & {
  Root: T | undefined;
  UserProfile: T | undefined;
  AllUsers: T | undefined;
};
