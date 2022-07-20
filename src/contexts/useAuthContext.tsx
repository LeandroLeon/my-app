import AuthContext from "./AuthContext";
import { useContext } from "react";
import jwtDecode from "jwt-decode";

export const useAuthContext = () => {
  const user = useContext(AuthContext);
  if (user === undefined) {
    throw new Error("useAuthContext can only be used inside AuthProvider");
  }
  const rawToken = user?.getSignInUserSession()?.getAccessToken().getJwtToken();
  if (rawToken === undefined) return { user, isAdmin: false };
  const decodedToken = jwtDecode<any>(rawToken); // NOTE: We use <any> because we dont have a proper type for AWS JWT Token
  const isAdmin =
    (decodedToken.hasOwnProperty("cognito:groups") as boolean) &&
    (decodedToken["cognito:groups"].includes("admin") as boolean);
  return { user, isAdmin };
};
