import { get, postWithServerResponse, put } from "@/services/serverConfig";
import Services from "../serviceUrls";
import { LoginProps } from "./types";

function getLoggedInUser(): Promise<any> {
  return get(Services.Me);
}

function loginUser(data: LoginProps): Promise<any> {
  return postWithServerResponse(Services.Login, {}, data);
}

function logoutUser(): Promise<string> {
  return put(Services.Logout);
}

const AuthService = {
  getLoggedInUser,
  loginUser,
  logoutUser,
};

export default AuthService;
