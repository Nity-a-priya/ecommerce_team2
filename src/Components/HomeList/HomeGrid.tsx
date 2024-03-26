import {FlatList, View, StyleSheet} from 'react-native';
import Product from './Product';
import ProductModel from '../../Model/ProductModel';
import {useEffect, useState} from 'react';
import {
  connectToDatabase,
  getAllWishListItems,
  removeFromWishlist,
  addWishlistItem,
} from '../../Utils/SQLiteDB';

interface Props {
  dataList: ProductModel[];
}

const HomeGrid: React.FC<Props> = ({dataList}) => {
  const [wishlist, setWishlist] = useState<ProductModel[]>([]);

  useEffect(() => {
    async function fetchWishlist() {
      const db = await connectToDatabase();
      const allItems = await getAllWishListItems(db);
      setWishlist(allItems);
    }
    fetchWishlist();
  }, [removeFromWishlist, addWishlistItem]);

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
        data={dataList}
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

export default HomeGrid;
const styles = StyleSheet.create({
  rootContainer: {
    paddingBottom: '25%',
  },
});
