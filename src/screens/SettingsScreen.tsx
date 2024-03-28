import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  useColorScheme,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useContext, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {NameContext} from '../Utils/name-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-gesture-handler';

const SettingsScreen = () => {
  const {colors} = useTheme();
  const scheme = useColorScheme();
  const {name, getStoreData, setStoreData} = useContext(NameContext);
  const [isInputDisplay, setInputDisplay] = useState(false);
  const [newName, setNewName] = useState('');

  const themeHandler = () => {
    const setTheme = scheme === 'dark' ? 'light' : 'dark';
    setStoreData('theme', setTheme);
  };

  const editNameHandler = () => {
    setInputDisplay(true);
  };

  const textHandler = (value: string) => {
    setNewName(value);
  };

  const saveHandler = () => {
    setStoreData('name', newName);
    setInputDisplay(false);
  };

  const cancelHandler = () => {
    setInputDisplay(false);
    setNewName(name.name);
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

      <View>
        <Text style={styles.text}> Your Name is : - {name.name}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="edit your name"
            onPress={editNameHandler}
            disabled={isInputDisplay}
          />
        </View>
        {isInputDisplay && (
          <View>
            <TextInput
              style={styles.textfiled}
              placeholder="Enter your name"
              value={newName}
              onChangeText={textHandler}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={cancelHandler}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={saveHandler}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
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

  buttonContainer: {
    marginHorizontal: 80,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    backgroundColor: 'blue', // Change to your desired color
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white', // Change to your desired color
    fontSize: 16,
    textAlign: 'center',
  },
  textfiled: {
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 2,
    marginHorizontal: 80,
    marginVertical: 20,
    paddingLeft: 10,
    height: 45,
  },
});
