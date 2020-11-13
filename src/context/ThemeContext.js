import React, {useState, useEffect} from 'react';

export const ThemeContext = React.createContext();

import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeProvider = ({children}) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getThemeValue();
    }

    () => (isSubscribed = false);
  }, [darkTheme]);

  const setThemeValue = async (dt) => {
    try {
      const value = {
        dark: dt,
      };
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@theme', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const getThemeValue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@theme');
      return jsonValue !== null
        ? setDarkTheme(JSON.parse(jsonValue).dark)
        : null;
    } catch (e) {
      console.log(e);
    }
  };
  const value = {
    darkTheme,
    setDarkTheme,
    setThemeValue,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
