import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {Appearance, ColorSchemeName, useColorScheme} from 'react-native';
import {NameContext} from '../../Utils/asyncStorageContext';
import AuthScreens from './AuthScreenNavigation';
import UnAuthScreen from './UnauthScreenNavigation';

const Navigate = () => {
  const {name, setStoreData, getStoreData} = useContext(NameContext);

  useEffect(() => {
    getStoreData('name');
    getStoreData('theme');
  }, []);

  useEffect(() => {
    const colorScheme: ColorSchemeName = name.theme as ColorSchemeName;
    Appearance.setColorScheme(colorScheme);
  }, [name]);

  return (
    <NavigationContainer
      theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
      {!!name.name ? <AuthScreens /> : <UnAuthScreen />}
    </NavigationContainer>
  );
};

export default Navigate;
