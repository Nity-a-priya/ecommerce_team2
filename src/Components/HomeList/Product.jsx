import {Image, Text, View, StyleSheet, Pressable} from 'react-native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useTheme} from '@react-navigation/native';

const Product = ({itemdata}) => {
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
            numberOfLines={2}
            ellipsizeMode="tail">
            {itemdata.title}
          </Text>

          <Text style={[styles.price, {color: colors.text}]}>
            ${itemdata.price}
          </Text>
          <View style={styles.rating}>
            <StarRatingDisplay rating={itemdata.rating.rate} starSize={20} />
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
  itemContainer: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  price: {
    marginVertical: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 11,
    fontWeight: '300',
  },
});
