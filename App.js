import React, {useContext} from 'react';
import {StatusBar, SafeAreaView, useColorScheme} from 'react-native';

import Login from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import CartScreen from './src/screens/CartScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import NameContextProvider from './src/Utils/name-context';
import {NameContext} from './src/Utils/name-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContextProvider from './src/Utils/theme-context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const UnAuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const Navigate = () => {
  const nameCtx = useContext(NameContext);
  nameCtx.getStoreData('name');
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {!!nameCtx.name ? <AuthScreens /> : <UnAuthScreen />}
    </NavigationContainer>
  );
};

export default App = () => {
  return (
    <ThemeContextProvider>
      <SafeAreaView style={{flex: 1}}>
        <NameContextProvider>
          <Navigate />
        </NameContextProvider>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ThemeContextProvider>
  );
};
