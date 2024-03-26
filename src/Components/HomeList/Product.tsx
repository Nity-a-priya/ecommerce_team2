import {Image, Text, View, StyleSheet, Pressable, Platform} from 'react-native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductModel from '../../Model/ProductModel';
import {Dimensions} from 'react-native';

interface Props {
  itemdata: ProductModel;
  wishlist: ProductModel[];
  favouritesHandler: (itemdata: ProductModel) => void;
  isWishlist: boolean;
}

const Product: React.FC<Props> = ({
  itemdata,
  wishlist,
  favouritesHandler,
  isWishlist,
}) => {
  const {colors} = useTheme();
  const isFavourite = wishlist.some(
    wishlistItem => wishlistItem.id === itemdata.id,
  );

  let heartType = 'heart-outline';
  if (isFavourite) {
    heartType = 'heart';
  }

  const favouritesTouchHandler = async () => {
    favouritesHandler(itemdata);
  };

  console.log(isWishlist);

  return (
    <View
      style={[
        isWishlist ? wishlistStyles.rootContainer : styles.rootContainer,
        {backgroundColor: colors.card},
      ]}>
      <Pressable
        android_ripple={{color: '#ccc'}}
        style={({pressed}) =>
          pressed ? [styles.button, styles.pressed] : styles.button
        }>
        <Ionicons
          name={heartType}
          size={24}
          style={styles.favourite}
          onPress={favouritesTouchHandler}
        />
        <View
          style={
            isWishlist ? wishlistStyles.itemContainer : styles.itemContainer
          }>
          <Image
            source={{uri: itemdata.image}}
            style={isWishlist ? wishlistStyles.image : styles.image}
            resizeMode="contain"
          />

          <View style={isWishlist && wishlistStyles.detailsview}>
            <Text
              style={[
                isWishlist ? wishlistStyles.title : styles.title,
                {color: colors.text},
              ]}
              numberOfLines={isWishlist ? 1 : 2}
              ellipsizeMode="tail">
              {itemdata.title}
            </Text>

            <Text style={[ isWishlist ? wishlistStyles.price : styles.price, {color: colors.text}]}>
              ${itemdata.price}
            </Text>

            <View style={styles.rating}>
              <StarRatingDisplay rating={itemdata.rating.rate} starSize={18} />
              <Text style={[styles.ratingNumber, {color: colors.text}]}>
                ({itemdata.rating.rate})
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default Product;

const wishlistStyles = StyleSheet.create({
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
  },
  price: {
    marginVertical: 5,
    textAlign: 'auto',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    elevation: 4,
    shadowColor: 'black',
    margin: 16,
    height: 250,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.2,
    maxWidth: Dimensions.get('window').width / 2 - 20,
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
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
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
