import {StyleSheet, View, FlatList} from 'react-native';
import Product from '../Components/HomeList/Product';
import useWishlist from '../Components/Hooks/UseWishlist';

const WishlistScreen = () => {
  const {wishlist, favouritesHandler} = useWishlist();

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={wishlist}
        renderItem={({item}) => {
          return (
            <Product
              itemdata={item}
              wishlist={wishlist}
              favouritesHandler={favouritesHandler}
              isWishlist={true}
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 8,
  },
});
