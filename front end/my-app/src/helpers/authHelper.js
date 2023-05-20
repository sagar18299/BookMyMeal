import { initiateSocketConnection } from "./socketHelper";
import { AUTH_TOKEN } from "./constants";

const isLoggedIn = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

const loginUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  initiateSocketConnection();
};

const logoutUser = () => {
  localStorage.removeItem("user");
  initiateSocketConnection();
};

const getAccessToken = () => localStorage.getItem(AUTH_TOKEN);

export { loginUser, isLoggedIn, logoutUser, getAccessToken };
