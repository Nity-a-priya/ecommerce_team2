import {Image, Text, View, StyleSheet, Pressable, Platform} from 'react-native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductModel from '../Model/ProductModel';
import {Dimensions} from 'react-native';

const ProductDetails = ({ route }: any) => {

  const itemdata = route.params.productData;
  const {colors} = useTheme();

  return (
    <View style={[styles.rootContainer, {backgroundColor: colors.card}]}>
      <Pressable
        android_ripple={{color: '#ccc'}}
        style={({pressed}) =>
          pressed ? [styles.button, styles.pressed] : styles.button
        }>
        
        <View style={styles.itemContainer}>
          <Image
            source={{uri: itemdata.image}}
            style={styles.image}
            resizeMode="contain"
          />

          <Text
            style={[styles.title, {color: colors.text}]}
            ellipsizeMode="tail">
            {itemdata.title}
          </Text>

          <Text
            style={[styles.price,
              {color: colors.text},
            ]}>
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
export default ProductDetails;

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
