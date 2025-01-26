export const BASE_URL = process.env.VITE_PRODURL;

export const AppRoutes = {
  login: BASE_URL + "auth/login",
  signup: BASE_URL + "auth/signup",
  getMyInfo: BASE_URL + "user/myInfo",
  addRequest: BASE_URL + "addRequest"
};