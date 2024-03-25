import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import Product from '../Model/ProductModel';

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

export const addWishlistItem = async (db: SQLiteDatabase, product: Product) => {
  const insertQuery = `
     INSERT INTO UserWishlist (id, title, price, description, category, image, rate, count)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
   `;
  const values = [
    product.id,
    product.title,
    product.price,
    product.description,
    product.category,
    product.image,
    product.rating.rate,
    product.rating.count,
  ];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add wishlist');
  }
};

export const getAllWishListItems = async (
  db: SQLiteDatabase,
): Promise<Product[]> => {
  try {
    const wishlist: Product[] = [];
    const results = await db.executeSql('SELECT * FROM UserWishlist');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        wishlist.push(result.rows.item(index));
      }
    });
    return wishlist;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get wishlist from database');
  }
};

type Table = 'UserWishlist';

export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DELETE FROM ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};
