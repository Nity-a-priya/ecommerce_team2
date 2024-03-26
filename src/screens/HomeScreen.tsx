import {Text, StyleSheet, ImageBackground, View} from 'react-native';
import {NameContext} from '../Utils/name-context';
import {useContext, useEffect, useState} from 'react';
import HomeGrid from '../Components/HomeList/HomeGrid';
import ProductModel from '../Model/ProductModel';

const HomeScreen = () => {
  const [dataList, setDatalist] = useState<ProductModel[]>([]);
  const {name, getStoreData} = useContext(NameContext);

  const getAPIData = async () => {
    const url = 'https://fakestoreapi.com/products';
    const response = await fetch(url);
    const result: ProductModel[] = await response.json();
    setDatalist(result);
  };
  useEffect(() => {
    getAPIData();
    getStoreData('name');
  }, []);

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
