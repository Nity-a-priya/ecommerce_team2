import {useEffect, useState} from 'react';

import CartList from '../Components/CartList';
import {connectToDatabase} from '../Utils/Database/SQLiteDB';
import {getAllCartListItems} from '../Utils/Database/UserCartList';
import CartModel from '../Model/CartModel';
import {FlatList} from 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {updateCartItemQuantity} from '../Utils/Database/UserCartList';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartModel[]>([]);
  const isfocused = useIsFocused();

  const getCartList = async () => {
    const db = await connectToDatabase();
    const allcartItems = await getAllCartListItems(db);
    setCartItems(allcartItems);
  };

  useEffect(() => {
    getCartList();
  }, [isfocused]);

  const removeHandler = async (itemdata: CartModel) => {
    const db = await connectToDatabase();
    let quantity = itemdata.quantity;
    if (quantity > 1) {
      await updateCartItemQuantity(db, itemdata.id, --quantity);
      getCartList();
    }
  };
  const addHandler = async (itemdata: CartModel) => {
    const db = await connectToDatabase();

    await updateCartItemQuantity(db, itemdata.id, ++itemdata.quantity);
    getCartList();
  };

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={cartItems}
        renderItem={({item}) => {
          return (
            <CartList
              itemdata={item}
              removeHandler={removeHandler}
              addHandler={addHandler}
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 8,
  },
});
