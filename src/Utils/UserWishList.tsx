import {
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import Product from '../Model/ProductModel';

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
        const row = result.rows.item(index);
        const product: Product = {
          id: row.id,
          title: row.title,
          price: row.price,
          description: row.description,
          category: row.category,
          image: row.image,
          rating: {
            rate: row.rate,
            count: row.count,
          },
        };
        wishlist.push(product);
      }
    });
    return wishlist;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get wishlist from database');
  }
};

export const getSpecificItem = async (db: SQLiteDatabase, product: Product) => {
  const query = `SELECT * FROM UserWishlist WHERE id = ${product.id}`;
  try {
    const results = await db.executeSql(query);
    if (results[0]?.rows?.length) {
      return results[0].rows.item(0);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw Error('Failed to get user preferences from database');
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

export const removeFromWishlist = async (
  db: SQLiteDatabase,
  product: Product,
) => {
  const deleteQuery = `
      DELETE FROM UserWishlist
      WHERE id = ?
    `;
  const values = [product.id];
  try {
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove product');
  }
};
