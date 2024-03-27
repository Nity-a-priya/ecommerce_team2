import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
interface Props {
  icon: any;
  size: number;
  color: any;
  onPress: () => void;
}
const IconButton: React.FC<Props> = ({icon, size, color, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <View style={styles.container}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    padding: 4,
    backgroundColor: '#C0C0C0',
  },
  button: {
    padding: 4,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
