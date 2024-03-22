import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';

import NameContextProvider from './src/Utils/name-context';
import Navigate from './src/Components/Navigation/Navigate';

export default App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <NameContextProvider>
          <Navigate />
        </NameContextProvider>
      </SafeAreaView>
    </>
  );
};
