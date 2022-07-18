import { createContext } from "react";
import { CognitoUser } from "@aws-amplify/auth";

const AuthContext = createContext<CognitoUser | null>(null);

export default AuthContext;
