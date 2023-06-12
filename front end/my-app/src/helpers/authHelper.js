import { AUTH_TOKEN } from "./constants";

const isLoggedIn = () => {
  return localStorage.getItem(AUTH_TOKEN);
};


const getAccessToken = () => localStorage.getItem(AUTH_TOKEN);

export { isLoggedIn, getAccessToken };
