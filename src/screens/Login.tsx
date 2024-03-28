import {useContext, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../Components/ui/Button';
import {NameContext} from '../Utils/asyncStorageContext';

const Login = () => {
  const {setStoreData} = useContext(NameContext);
  const [name, setName] = useState('');

  const inputHandler = (value: string) => {
    setName(value);
  };
  const submitHandler = () => {
    setStoreData('name', name);
  };

  return (
    <LinearGradient colors={['#0B1C47', '#300000']} style={styles.rootScreen}>
      <TextInput
        placeholder="Enter your name!"
        placeholderTextColor="grey"
        style={styles.textInput}
        onChangeText={inputHandler}
        value={name}
      />
      <Button onPress={submitHandler}>Submit</Button>
    </LinearGradient>
  );
};

export default Login;
const styles = StyleSheet.create({
  rootScreen: {
    height: '100%',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 16,
    borderRadius: 5,
    marginHorizontal: 60,
    marginBottom: 20,
    fontSize: 20,
    color: 'white',
  },
});
