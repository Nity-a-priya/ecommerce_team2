import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {View, StyleSheet, Text, FlatList} from 'react-native';

import CartList from '../Components/CartList';
import {connectToDatabase} from '../Utils/Database/SQLiteDB';
import {getAllCartListItems} from '../Utils/Database/UserCartList';
import CartModel from '../Model/CartModel';
import {useIsFocused} from '@react-navigation/native';
import {updateCartItemQuantity} from '../Utils/Database/UserCartList';
import CartButton from '../Components/ui/CartButton';

const CartScreen = () => {
  const {colors} = useTheme();

  const [cartItems, setCartItems] = useState<CartModel[]>([]);
  const isfocused = useIsFocused();
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartList = async () => {
    const db = await connectToDatabase();
    const allcartItems = await getAllCartListItems(db);
    setCartItems(allcartItems);

    const totalPrice = allcartItems.reduce(
      (currentTotal, currentItem) =>
        currentTotal + currentItem.price * currentItem.quantity,
      0,
    );
    setTotalPrice(totalPrice);
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

  const cartHandler = () => {};

  return (
    <View style={styles.rootContainer}>
      <FlatList
        style={styles.list}
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
        ListFooterComponent={() => (
          <View style={styles.listFooter}>
            <Text style={styles.footerText}>
              Subtotal:{' '}
              <Text style={[styles.subtotalPrice, {color: colors.text}]}>
                $
                {totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </Text>
            </Text>
            <Text style={styles.footerText}>
              Taxes:{' '}
              <Text style={[styles.subtotalPrice, {color: colors.text}]}>
                $40
              </Text>
            </Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.cartTotal}>
          $
          {(totalPrice + 40).toLocaleString('en-US', {
            minimumFractionDigits: 2,
          })}
        </Text>
        <CartButton onPress={cartHandler} icon="sign-out-alt">
          Check Out
        </CartButton>
      </View>
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 8,
  },
  list: {
    flex: 5,
  },
  listFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 10,
  },
  subtotalPrice: {color: 'black'},
  footer: {
    flex: 0.1,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  cartTotal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
