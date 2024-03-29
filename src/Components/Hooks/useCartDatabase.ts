import {useEffect, useState} from 'react';
import {
  getAllCartListItems,
  updateCartItemQuantity,
  removeCartTable,
} from '../../Utils/Database/CartDB';
import CartModel from '../../Model/CartModel';
import {useIsFocused} from '@react-navigation/native';

const useCartDatabase = () => {
  const [cartItems, setCartItems] = useState<CartModel[]>([]);
  const isfocused = useIsFocused();

  useEffect(() => {
    getCartList();
    console.log('getCartList');
  }, [isfocused]);

  const getCartList = async () => {
    const allcartItems = await getAllCartListItems();
    setCartItems(allcartItems);
  };

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    await updateCartItemQuantity(itemId, newQuantity);
    getCartList();
  };

  const clearCartList = async () => {
    await removeCartTable();
    getCartList();
  };

  return {
    cartItems,
    updateQuantity,
    clearCartList,
  };
};

export default useCartDatabase;
