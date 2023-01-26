import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import {
  createUserWithEmail,
  loginWithGoogle,
  logOut,
  resetPassword,
  signInUserWithEmail,
  userState,
} from '../../firebase/config';

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is not auth provider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signup = async (user, email, password) => {
    await createUserWithEmail(email, password);
  };

  const login = async (email, password) => {
    await signInUserWithEmail(email, password);
  };

  const logout = async () => {
    await logOut();
  };

  const loginGoogle = async () => {
    await loginWithGoogle();
  };

  const resetpassword = async email => {
    await resetPassword(email);
  };

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await userState(setUser);
      setUser(currentUser);
    };
    getUser();
  }, []);

  return (
    <authContext.Provider
      value={{ signup, login, user, logout, loginGoogle, resetpassword }}
    >
      {children}
    </authContext.Provider>
  );
};
