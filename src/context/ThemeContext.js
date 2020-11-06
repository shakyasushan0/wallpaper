import React, {useState} from 'react';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({children}) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const value = {
    darkTheme,
    setDarkTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
