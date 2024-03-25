import {Image, Text, View, StyleSheet, Pressable, Platform} from 'react-native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useTheme} from '@react-navigation/native';
import {
  addWishlistItem,
  connectToDatabase,
  removeFromWishlist,
  getSpecificItem,
} from '../../Utils/SQLiteDB';
import {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductModel from '../../Model/ProductModel';

interface Props {
  itemdata: ProductModel;
}
const Product: React.FC<Props> = ({itemdata}) => {
  const {colors} = useTheme();
  const [isFavourite, setIsFavourite] = useState(false);

  const getItem = async () => {
    const db = await connectToDatabase();
    const itemPresence = await getSpecificItem(db, itemdata);
    !!itemPresence ? setIsFavourite(true) : setIsFavourite(false);
  };
  useEffect(() => {
    getItem();
  }, []);

  const favouritesHandler = async () => {
    const db = await connectToDatabase();
    if (isFavourite) {
      setIsFavourite(false);
      await removeFromWishlist(db, itemdata);
    } else {
      setIsFavourite(true);
      await addWishlistItem(db, itemdata);
    }
  };

  let heartType = 'heart-outline';
  if (isFavourite) {
    heartType = 'heart';
  }

  return (
    <View style={[styles.rootContainer, {backgroundColor: colors.card}]}>
      <Pressable
        android_ripple={{color: '#ccc'}}
        style={({pressed}) =>
          pressed ? [styles.button, styles.pressed] : styles.button
        }>
        <Ionicons
          name={heartType}
          size={24}
          style={styles.favourite}
          onPress={favouritesHandler}
        />
        <View style={styles.itemContainer}>
          <Image
            source={{uri: itemdata.image}}
            style={styles.image}
            resizeMode="contain"
          />
          <Text
            style={[styles.title, {color: colors.text}]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {itemdata.title}
          </Text>

          <Text style={[styles.price, {color: colors.text}]}>
            ${itemdata.price}
          </Text>
          <View style={styles.rating}>
            <StarRatingDisplay rating={itemdata.rating.rate} starSize={18} />
            <Text style={[styles.ratingNumber, {color: colors.text}]}>
              ({itemdata.rating.rate})
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default Product;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    margin: 16,
    height: 250,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    shadowOpacity: 0.5,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  pressed: {
    opacity: 0.5,
  },

  favourite: {
    textAlign: 'right',
    marginHorizontal: 5,
    marginTop: 5,
    color: '#C00000',
  },
  itemContainer: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  price: {
    marginVertical: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 10,
    fontWeight: '300',
  },
});
