import {useEffect, useState} from 'react';
import {Text, StyleSheet, ImageBackground, View, FlatList} from 'react-native';
import {
  addWishlistItem,
  connectToDatabase,
  getAllWishListItems,
  removeTable,
} from '../Utils/SQLiteDB';
import ProductModel from '../Model/ProductModel';

const WishlistScreen = () => {
  const [wishlistItems, setWishlistItems] = useState<ProductModel[]>([]);

  const getWishlistItems = async () => {
    const db = await connectToDatabase();
    const items = await getAllWishListItems(db);
    console.log(items);
    setWishlistItems(items);
  };
  useEffect(() => {
    getWishlistItems();
  }, [addWishlistItem]);

  return (
    <View style={styles.outerScreen}>
      <FlatList
        data={wishlistItems}
        renderItem={({item}) => {
          return <Text>{item.title}</Text>;
        }}
        keyExtractor={item => item.id.toString()}
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
});
