import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {NameContext} from '../../Utils/name-context';
import React, {useContext, useEffect, useLayoutEffect} from 'react';
import AuthScreens from './AuthScreenNavigation';
import UnAuthScreen from './UnauthScreenNavigation';
import {Appearance, useColorScheme} from 'react-native';

const Navigate = () => {
  const {name, setStoreData, getStoreData} = useContext(NameContext);

  useEffect(() => {
    getStoreData('name');
    getStoreData('theme');
  }, []);

  useEffect(() => {
    const theme = name.theme === 'light' ? 'light' : 'dark';
    Appearance.setColorScheme(theme);
  }, [name]);

  return (
    <NavigationContainer
      theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
      {!!name.name ? <AuthScreens /> : <UnAuthScreen />}
    </NavigationContainer>
  );
};

export default Navigate;
