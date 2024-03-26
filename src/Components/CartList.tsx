import {useTheme} from '@react-navigation/native';
import {Text, StyleSheet, Image, View, Platform} from 'react-native';

import CartModel from '../Model/CartModel';
import IconButton from './ui/IconButton';

interface Props {
  itemdata: CartModel;
}

const CartList: React.FC<Props> = ({itemdata}) => {
  const {colors} = useTheme();

  const removeHandler = () => {};

  const addHandler = () => {};

  return (
    <View style={[styles.rootContainer, {backgroundColor: colors.card}]}>
      <View style={styles.itemContainer}>
        <Image
          source={{uri: itemdata.image}}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.detailsview}>
          <Text
            style={[styles.title, {color: colors.text}]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {itemdata.title}
          </Text>

          <Text style={[styles.price, {color: colors.text}]}>
            ${itemdata.price}
          </Text>
        </View>
        <View style={styles.quantityView}>
          <IconButton
            icon="remove"
            size="8"
            color="black"
            onPress={removeHandler}
          />
          <Text style={[styles.quantity, {color: colors.text}]}>
            {itemdata.quantity}
          </Text>
          <IconButton icon="add" size="8" color="black" onPress={addHandler} />
        </View>
      </View>
    </View>
  );
};
export default CartList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    elevation: 4,
    shadowColor: 'black',
    margin: 16,
    height: 120,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.2,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    marginLeft: 16,
  },
  detailsview: {
    flex: 1,
    marginRight: 16,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  price: {
    marginVertical: 5,
    textAlign: 'auto',
    fontWeight: 'bold',
    fontSize: 20,
  },
  quantityView: {
    marginRight: 6,
  },
  quantity: {
    textAlign: 'center',
  },
});
