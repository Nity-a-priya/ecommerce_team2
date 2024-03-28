import React, {useCallback, useEffect} from 'react';
import NameContextProvider from './src/Utils/asyncStorageContext';
import Navigate from './src/Components/Navigation/Navigate';
import {connectToDatabase, createTables} from './src/Utils/Database/SQLiteDB';

// TODO : first declare and then export if default
const App = () => {
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

export default App;
