import { getCurrentUser } from "@/lib/appwrite/api";
import { ContextProps, ExistingUserProps } from "@/types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  imageUrl: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

export const AuthContext = createContext<ContextProps>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ExistingUserProps>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
        });
        setIsAuthenticated(true);

        return true;
      }
      return false;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    )
      navigate("/login");
    checkAuthUser();
  }, []);

  const contextData = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
