import React, {createContext} from 'react';
import {Appearance} from 'react-native';

export const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
  const toggleTheme = () => {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme == 'light') {
      Appearance.setColorScheme('dark');
    } else {
      Appearance.setColorScheme('light');
    }
  };

  const value = {
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
