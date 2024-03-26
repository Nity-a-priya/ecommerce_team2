import {FlatList, View, StyleSheet} from 'react-native';
import Product from './Product';
import ProductModel from '../../Model/ProductModel';
import useWishlist from '../Hooks/UseWishlist';

interface Props {
  dataList: ProductModel[];
}

const HomeGrid: React.FC<Props> = ({dataList}) => {
  const {wishlist, favouritesHandler} = useWishlist();

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
              isWishlist={false}
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
