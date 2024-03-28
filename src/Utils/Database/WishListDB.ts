// TODO : Name change to camelCase
import Product from '../../Model/ProductModel';
import {connectToDatabase} from './SQLiteDB';

export const addWishlistItem = async (product: Product) => {
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
    const db = await connectToDatabase();
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add wishlist');
  }
};

export const getAllWishListItems = async (): Promise<Product[]> => {
  try {
    const db = await connectToDatabase();
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

export const getSpecificItem = async (product: Product) => {
  const query = `SELECT * FROM UserWishlist WHERE id = ${product.id}`;
  try {
    const db = await connectToDatabase();
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

export const removeTable = async (tableName: Table) => {
  const query = `DELETE FROM ${tableName}`;
  try {
    const db = await connectToDatabase();
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};

export const removeFromWishlist = async (product: Product) => {
  const deleteQuery = `
      DELETE FROM UserWishlist
      WHERE id = ?
    `;
  const values = [product.id];
  try {
    const db = await connectToDatabase();
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to remove product');
  }
};
