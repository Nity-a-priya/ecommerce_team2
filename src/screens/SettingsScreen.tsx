import {useTheme} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NameContext} from '../Utils/asyncStorageContext';
import CustomButton from '../Components/ui/Button';

const SettingsScreen = () => {
  const {colors} = useTheme();
  const scheme = useColorScheme();
  const {name, setStoreData} = useContext(NameContext);
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

        <CustomButton
          onPress={editNameHandler}
          customStyles={styles.editbutton}
          disabled={isInputDisplay}>
          Edit Your Name
        </CustomButton>

        {isInputDisplay && (
          <View>
            <TextInput
              style={styles.textfiled}
              placeholder="Enter your name"
              value={newName}
              onChangeText={textHandler}
            />
            <View style={styles.buttonRow}>
              <CustomButton
                onPress={cancelHandler}
                customStyles={styles.button}>
                Cancel
              </CustomButton>

              <CustomButton onPress={saveHandler} customStyles={styles.button}>
                Save
              </CustomButton>
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
    justifyContent: 'space-between',
    marginHorizontal: 75,
  },
  editbutton: {
    marginHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 10,
  },

  button: {
    borderRadius: 10,
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
    fontSize: 18,
  },
});
