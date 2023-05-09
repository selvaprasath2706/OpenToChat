"use client";
import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/app/firebase/config";
const auth = getAuth(firebase_app);
export interface IAuth {
  loggedIn: boolean;
}
export const initialState: IAuth = {
  loggedIn: false,
};

export const AuthContext = React.createContext<IAuth>(initialState);
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<IAuth>(initialState);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ loggedIn: true });
      } else {
        setUser({ loggedIn: false });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
