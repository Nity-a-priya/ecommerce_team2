import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, createContext, ReactNode} from 'react';

interface ContextProps {
  name: {[key: string]: string};
  setStoreData: (key: string, value: string) => Promise<void>;
  getStoreData: (key: string) => Promise<void>;
}

export const NameContext = createContext<ContextProps>({
  name: {},
  setStoreData: async () => {},
  getStoreData: async () => {},
});

interface Props {
  children: ReactNode;
}

const NameContextProvider: React.FC<Props> = ({children}) => {
  const [retrievedData, setRetrievedData] = useState<{[key: string]: string}>(
    {},
  );

  const setStoreData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      setRetrievedData(currValue => ({...currValue, [key]: value}));
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };

  const getStoreData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setRetrievedData(currValue => ({...currValue, [key]: value}));
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  const contextValue: ContextProps = {
    name: retrievedData,
    setStoreData: setStoreData,
    getStoreData: getStoreData,
  };

  return (
    <NameContext.Provider value={contextValue}>{children}</NameContext.Provider>
  );
};

export default NameContextProvider;
