import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartScreen from '../../screens/CartScreen';
import HomeScreen from '../../screens/HomeScreen';
import ProductDetails from '../../screens/ProductDetails';
import SettingsScreen from '../../screens/SettingsScreen';
import WishlistScreen from '../../screens/WishlistScreen';
import {View} from 'react-native';
import useWishlist from '../Hooks/useWishlist';
import {useIsFocused} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthScreens = () => {
  const isfocused = useIsFocused();
  const {wishlist, deleteWishList} = useWishlist();

  const clearWishlist = () => {
    deleteWishList();
  };

  useEffect(() => {}, [isfocused]);

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
                headerRight: ({tintColor}) => {
                  return (
                    <View style={{marginRight: 15}}>
                      <Ionicons
                        name="trash-outline"
                        color={tintColor}
                        size={25}
                        onPress={clearWishlist}
                      />
                    </View>
                  );
                },
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
