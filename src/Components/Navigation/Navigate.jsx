import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {NameContext} from '../../Utils/name-context';
import React, {useContext, useEffect} from 'react';
import AuthScreens from './AuthScreenNavigation';
import UnAuthScreen from './UnauthScreenNavigation';

const Navigate = () => {
  const {name, setStoreData, getStoreData} = useContext(NameContext);
  useEffect(() => {
    getStoreData('name');
    getStoreData('theme');
  }, []);

  return (
    <NavigationContainer
      theme={name.theme === 'dark' ? DarkTheme : DefaultTheme}>
      {!!name.name ? <AuthScreens /> : <UnAuthScreen />}
    </NavigationContainer>
  );
};

export default Navigate;
