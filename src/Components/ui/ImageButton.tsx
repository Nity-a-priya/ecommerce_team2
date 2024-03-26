import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  icon: string;
}

const ImageButton: React.FC<Props> = ({children, icon, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <Ionicons style={styles.icon} name={icon} size={20} color={'white'} />
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default ImageButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#c30b64',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 90,
    marginVertical: 15,
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
