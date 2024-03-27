import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  children: React.ReactNode;
  icon: string;
  onPress: () => void;
}

const CartButton: React.FC<Props> = ({children, icon, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <FontAwesome5 style={styles.icon} name={icon} size={12} color={'white'} />
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    paddingVertical: 12,
    width: 110,
    backgroundColor: '#0033A5',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 6,
  },
});
