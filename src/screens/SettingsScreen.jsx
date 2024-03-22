import {Text, StyleSheet, View, Button, useColorScheme} from 'react-native';
import {useContext, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {NameContext} from '../Utils/name-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const storeCtx = useContext(NameContext);
  const {colors} = useTheme();
  const scheme = useColorScheme();

  const themeHandler = () => {
    const setTheme = scheme === 'dark' ? 'light' : 'dark';
    storeCtx.setStoreData('theme', setTheme);
  };

  return (
    <>
      <View style={styles.container}>
        <MaterialIcons
          name="brightness-6"
          size={24}
          onPress={themeHandler}
          color={colors.text}
          style={styles.icon}
        />
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
  icon: {
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});
