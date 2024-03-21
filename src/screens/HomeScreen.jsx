import {Text, StyleSheet, ImageBackground, View} from 'react-native';
import {NameContext} from '../Utils/name-context';
import {useContext, useEffect, useState} from 'react';
import HomeGrid from '../Components/HomeList/HomeGrid';

const HomeScreen = () => {
  const nameCtx = useContext(NameContext);
  const [dataList, setDatalist] = useState([]);

  const getAPIData = async () => {
    const url = 'https://fakestoreapi.com/products';
    let result = await fetch(url);
    result = await result.json();
    setDatalist(result);
  };
  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <View style={styles.outerScreen}>
      <Text style={styles.text}>Hey {nameCtx.name.name} !!</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#3B3B3B',
    color: '#C5C5C5',
  },
});
