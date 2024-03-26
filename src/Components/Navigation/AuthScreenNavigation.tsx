import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import WishlistScreen from '../../screens/WishlistScreen';
import CartScreen from '../../screens/CartScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import ProductDetails from '../../screens/ProductDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" options={{headerShown: false}}>
        {() => (
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
        )}
      </Stack.Screen>
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default AuthScreens;
