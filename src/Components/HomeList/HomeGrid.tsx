import {FlatList, View, StyleSheet} from 'react-native';
import Product from './Product';
import ProductModel from '../../Model/ProductModel';

interface Props {
  dataList: ProductModel[]; // Specify that dataList is an array of Product type
}

const HomeGrid: React.FC<Props> = ({dataList}) => (
  <View style={styles.rootContainer}>
    <FlatList
      data={dataList}
      renderItem={({item}) => {
        return <Product itemdata={item} />;
      }}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
    />
  </View>
);

// const HomeGrid: React.FC<Props> = ({dataList}) => (
//   <View style={styles.rootContainer}>
//     <FlatList
//       data={dataList}
//       renderItem={({item}) => {
//         return <Product itemdata={item} />;
//       }}
//       keyExtractor={item => item.id}
//       numColumns={2}
//     />
//   </View>
// );



export default HomeGrid;
const styles = StyleSheet.create({
  rootContainer: {
    paddingBottom: '25%',
  },
});


