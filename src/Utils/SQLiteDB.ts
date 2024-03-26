import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

// Enable promise for SQLite
enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'ecommerce_team2.db', location: 'default'},
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
  const userWishlistQuery = `
      CREATE TABLE IF NOT EXISTS UserWishlist (
          id INTEGER DEFAULT 1,
          title TEXT,
          price INTEGER,
          description TEXT,
          category TEXT,
          image TEXT,
          rate INTEGER,
          count INTEGER,
          PRIMARY KEY(id)
      )
    `;
  try {
    await db.executeSql(userWishlistQuery);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
};