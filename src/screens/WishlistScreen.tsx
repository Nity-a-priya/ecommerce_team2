import {useEffect, useState} from 'react';
import {Text, StyleSheet, ImageBackground, View, FlatList} from 'react-native';
import ProductModel from '../Model/ProductModel';
import Product from '../Components/HomeList/Product';
import {useIsFocused} from '@react-navigation/native';
import {
  connectToDatabase,
  getAllWishListItems,
  removeFromWishlist,
  addWishlistItem,
} from '../Utils/SQLiteDB';

const WishlistScreen = () => {

  const [wishlist, setWishlist] = useState<ProductModel[]>([]);
  const isFocused = useIsFocused();

  const getWishlistItems = async () => {
    const db = await connectToDatabase();
    const items = await getAllWishListItems(db);
    setWishlist(items);
  };

  useEffect(() => {
    getWishlistItems();
  }, [isFocused]);

  const favouritesHandler = async (itemdata: ProductModel) => {
     const db = await connectToDatabase();
     const itemInWishlist = wishlist.some(item => item.id === itemdata.id);
     if (itemInWishlist) {
       await removeFromWishlist(db, itemdata);
     } else {
       await addWishlistItem(db, itemdata);
     }
     // After adding or removing from wishlist, update the wishlist state
     const updatedWishlist = await getAllWishListItems(db);
     setWishlist(updatedWishlist);
  };

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
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  outerScreen: {
    // backgroundColor: 'black',
  },
  rootScreen: {
    height: '100%',
    paddingTop: 15,
  },
  image: {
    opacity: 0.35,
  },
  text: {
    marginTop: 80,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#3B3B3B',
    color: '#C5C5C5',
  },
  rootContainer: {
    paddingBottom: '25%',
  },
});
