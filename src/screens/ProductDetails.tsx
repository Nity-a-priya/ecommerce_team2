// TODO : import react, remove unused imports
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import ImageButton from '../Components/ui/ImageButton';
import CartModel from '../Model/CartModel';
import useCartList from '../Components/Hooks/useCartList';
import {addCartlistItem} from '../Utils/Database/CartDB';

const ProductDetails = ({route, navigation}: any) => {
  const itemdata = route.params.itemdata;
  const {colors} = useTheme();
  const {isProductAdded, setProductAdded} = useCartList(itemdata);

  const cartHandler = async () => {
    const cartItem: CartModel = {
      id: itemdata.id,
      title: itemdata.title,
      price: itemdata.price,
      image: itemdata.image,
      quantity: 1,
    };
    addCartlistItem(cartItem);
    setProductAdded(true);
    console.log('Added');
  };

  const gotoCartHandler = async () => {
    navigation.navigate('Cart');
  };
  return (
    <View style={[styles.rootContainer, {backgroundColor: colors.card}]}>
      <View style={styles.itemContainer}>
        <Image
          source={{uri: itemdata.image}}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={[styles.title, {color: colors.text}]} ellipsizeMode="tail">
          {itemdata.title}
        </Text>

        <Text style={[styles.price, {color: colors.text}]}>
          ${itemdata.price}
        </Text>

        <View style={styles.rating}>
          <StarRatingDisplay rating={itemdata.rating.rate} starSize={28} />
          <Text style={[styles.ratingNumber, {color: colors.text}]}>
            ({itemdata.rating.rate})
          </Text>
        </View>

        {!isProductAdded ? (
          <ImageButton icon="cart" onPress={cartHandler}>
            Add to Cart
          </ImageButton>
        ) : (
          <ImageButton icon="cart" onPress={gotoCartHandler}>
            Go to Cart
          </ImageButton>
        )}
      </View>
    </View>
  );
};
export default ProductDetails;

const styles = StyleSheet.create({
  rootContainer: {
    elevation: 4,
    shadowColor: 'black',
    margin: 16,
    height: 500,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.2,
    flex: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  itemContainer: {
    marginTop: 30,
    borderRadius: 8,
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    width: 300,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 15,
  },
  price: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingNumber: {
    fontSize: 15,
    fontWeight: '300',
  },
});
