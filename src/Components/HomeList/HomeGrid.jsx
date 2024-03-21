import {FlatList, View, StyleSheet} from 'react-native';
import Product from './Product';

const HomeGrid = ({dataList}) => {
  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={dataList}
        renderItem={({item}) => {
          return <Product itemdata={item} />;
        }}
        keyExtractor={item => item.id}
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
