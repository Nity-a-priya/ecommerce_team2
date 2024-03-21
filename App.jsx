import React from 'react';
import {StatusBar, SafeAreaView, useColorScheme} from 'react-native';

import NameContextProvider from './src/Utils/name-context';
import ThemeContextProvider from './src/Utils/theme-context';
import Navigate from './src/Components/Navigation/Navigate';

export default App = () => {
  const scheme = useColorScheme();
  return (
    <ThemeContextProvider>
      <StatusBar style={scheme} />
      <SafeAreaView style={{flex: 1}}>
        <NameContextProvider>
          <Navigate />
        </NameContextProvider>
      </SafeAreaView>
    </ThemeContextProvider>
  );
};
