import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  customStyles?: {};
  disabled?: boolean;
  imageName?: any;
}

const Button: React.FC<Props> = ({
  children,
  onPress,
  customStyles,
  disabled,
  imageName,
}) => {
  const buttonOpacity = disabled ? 0.4 : 1;
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
        customStyles,
        {opacity: buttonOpacity},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
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
  icon: {
    marginRight: 6,
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'row',

    alignItems: 'center',
  },
});
