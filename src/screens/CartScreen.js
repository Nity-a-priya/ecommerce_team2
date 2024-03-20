import {Text, StyleSheet, ImageBackground, View} from 'react-native';
import {NameContext} from '../Utils/name-context';
import {useContext} from 'react';

const CartScreen = () => {
  const nameCtx = useContext(NameContext);
  return (
    <View style={styles.outerScreen}>
      <ImageBackground
        source={require('../../assets/images/shopping.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.image}>
        <Text style={styles.text}> Cart Screen !!</Text>
      </ImageBackground>
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  outerScreen: {
    backgroundColor: 'black',
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
