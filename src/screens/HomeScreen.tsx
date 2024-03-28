import {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomeGrid from '../Components/HomeList/HomeGrid';
import ProductModel from '../Model/ProductModel';
import ProductService from '../Service/ProductService';
import {NameContext} from '../Utils/asyncStorageContext';

const HomeScreen = () => {
  const [dataList, setDatalist] = useState<ProductModel[]>([]);
  const {name, getStoreData} = useContext(NameContext);
  const productService = new ProductService();

  function getProductList() {
    productService
      .fetchProduct()
      .then(result => {
        setDatalist(result);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }

  useEffect(() => {
    getProductList();
    getStoreData('name');
  }, []); // TODO : use memorised function that will not change

  return (
    <View style={styles.outerScreen}>
      <Text style={styles.text}>Hey {name.name} !!</Text>
      <HomeGrid dataList={dataList} />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  outerScreen: {},
  rootScreen: {
    height: '100%',
    paddingTop: 15,
  },
  image: {
    opacity: 0.15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#3B3B3B',
    color: '#C5C5C5',
  },
});
