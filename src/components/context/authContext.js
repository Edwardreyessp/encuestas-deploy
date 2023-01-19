import { useContext } from 'react';
import { createContext } from 'react';
import { createUserWithEmail } from '../../firebase/config';

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is not auth provider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const signup = async (user, email, password) => {
    await createUserWithEmail(email, password);
  };
  return (
    <authContext.Provider value={{ signup }}>{children}</authContext.Provider>
  );
};
