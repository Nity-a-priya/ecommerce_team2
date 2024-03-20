import {Text, StyleSheet, View, Button} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../Utils/theme-context';
import {useTheme} from '@react-navigation/native';

const SettingsScreen = () => {
  const themeCtx = useContext(ThemeContext);
  const {colors} = useTheme();

  return (
    <>
      <View style={styles.container}>
        <Button title="Change Theme" onPress={themeCtx.toggleTheme} />
      </View>
      <Text style={[styles.text, {color: colors.text}]}>
        The Text color changes according to the Theme..!
      </Text>
    </>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});
