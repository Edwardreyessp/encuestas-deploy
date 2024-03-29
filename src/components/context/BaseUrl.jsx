import { useContext, useState } from 'react';
import { createContext } from 'react';

const urlContext = createContext();

export const useUrl = () => {
  const context = useContext(urlContext);
  if (!context) throw new Error('There is not url provider');
  return context;
};

export const UrlProvider = ({ children }) => {
  const [url, setUrl] = useState('https://defoebedevelop.com');

  return (
    <urlContext.Provider value={{ url, setUrl }}>
      {children}
    </urlContext.Provider>
  );
};
