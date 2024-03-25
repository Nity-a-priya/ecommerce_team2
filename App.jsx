import React, {useCallback, useEffect} from 'react';
import {StatusBar, SafeAreaView} from 'react-native';

import NameContextProvider from './src/Utils/name-context';
import Navigate from './src/Components/Navigation/Navigate';
import {connectToDatabase, createTables} from '././src/Utils/SQLiteDB';

export default App = () => {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <NameContextProvider>
        <Navigate />
      </NameContextProvider>
    </>
  );
};
