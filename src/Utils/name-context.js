import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, createContext} from 'react';

export const NameContext = createContext({
  name: '',
  setStoreData: () => {},
  getStoreData: () => {},
});

const NameContextProvider = ({children}) => {
  const [retrievedData, setretrievedData] = useState({});

  const setStoreData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      setretrievedData(currvalue => ({...currvalue, [key]: value}));
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };

  const getStoreData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setretrievedData(currvalue => ({...currvalue, [key]: value})); // {'name':'nitya','theme':'dark'}
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  const contextValue = {
    name: retrievedData,
    setStoreData: setStoreData,
    getStoreData: getStoreData,
  };

  return (
    <NameContext.Provider value={contextValue}>{children}</NameContext.Provider>
  );
};

export default NameContextProvider;
