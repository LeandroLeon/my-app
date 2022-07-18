import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    setUserFromAPI();
  }, []);

  const setUserFromAPI = () => {
    try {
      Auth.currentAuthenticatedUser({
        bypassCache: false,
      })
        .then((user) => {
          setUser(user);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthContext.Provider value={user ? user : null}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
