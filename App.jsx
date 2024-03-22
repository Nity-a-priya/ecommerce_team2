import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';

import NameContextProvider from './src/Utils/name-context';
import Navigate from './src/Components/Navigation/Navigate';

export default App = () => {
  return (
    <>
      <NameContextProvider>
        <Navigate />
      </NameContextProvider>
    </>
  );
};
